import { Tarefa } from "./models/tarefa.model.js";
import { IPageList } from "../interfaces/pagina.list.inteface.js";
import { IPaginaHTML } from "../interfaces/pagina.html.interface.js";
import { IRepositorio } from "../interfaces/repositorio.interface.js";
import { TarefaRepositoryLocalStorage } from "./repositories/tarefa.repository.local-storage.js";
import { ItemRepositoryLocalStorage } from "./itens/item.repository.local-storage.js";
import { Item } from "./itens/item.model.js";

class TarefaPageList implements IPaginaHTML, IPageList {
  
   tabela: HTMLTableElement;

   constructor(private repositrorioTarefas: IRepositorio<Tarefa>) {

      this.configurarElementos();
      this.atualizarTabela();
   }

   atualizarTabela(): void {
      const tarefas = this.repositrorioTarefas.selecionarTodos();

      let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];

      tarefas.forEach(tarefa => {

         const novaLinha = corpoTabela.insertRow();
         
         tarefa.porcentagem = this.calculrarPorcentagem(tarefa.titulo);
         tarefa.dataConclusao = this.verficarDataConclusao(tarefa.porcentagem);

         Object.values(tarefa).forEach( (valor: any) => {
               const novacelula = novaLinha.insertCell();
               novacelula.innerText = valor;
            }
         );
         
         this.criarBotaoEditar(novaLinha, tarefa);
         this.criarBotaoExcluir(novaLinha, tarefa);
      });
   }

   private criarBotaoEditar(novaLinha: HTMLTableRowElement, tarefa: Tarefa) {
      const celulaBotoes = novaLinha.insertCell();
      const btnEditar = document.createElement("a");
      btnEditar.innerText = "Editar";
      btnEditar.className = "btn btn-outline-success";

      btnEditar.addEventListener("click", () => {
         window.location.href = `tarefa.create.html?id=${tarefa.id}`;
      });

      celulaBotoes.appendChild(btnEditar);
   }

   private criarBotaoExcluir(novaLinha: HTMLTableRowElement, tarefa: Tarefa) {
      const celulaBotoes = novaLinha.insertCell();
      const btnExcluir = document.createElement("a");
      btnExcluir.innerText = "Excluir";
      btnExcluir.className = "btn btn-outline-info";

      btnExcluir.addEventListener("click", () => {
         this.repositrorioTarefas.excluir(tarefa.id);
         window.location.reload();
      });

      celulaBotoes.appendChild(btnExcluir);
   }

   configurarElementos(): void {
      this.tabela = document.getElementById("tabela") as HTMLTableElement;
   }

   calculrarPorcentagem(tituloTarefa: string): string {
      let porcentagem = 100; 
      const itens = new ItemRepositoryLocalStorage().selecionarTodos();
      const itensDestaTarefa: Item[] = []; 
      itens.forEach( x => {
         if(x.tarefa === tituloTarefa)
            itensDestaTarefa.push(x);
      });

      if(itensDestaTarefa.length === 0)
         return "0%";
      
      let concluidos = 0;
      
      itensDestaTarefa.forEach(x => {

         if(x.status === "Concluído")
            concluidos++;
      });

      porcentagem = (porcentagem * concluidos) / itensDestaTarefa.length;

      return porcentagem.toFixed(2).toString() + "%";
   }

   verficarDataConclusao(porcentagem: string): string {
      if(porcentagem === "100.00%") {
         const data = new Date();
         return data.getDate() + " / " + (data.getMonth() + 1) + " / " + data.getFullYear();
      }

      return "-";
   }

}

new TarefaPageList(new TarefaRepositoryLocalStorage());