import { Compromisso } from "./models/compromisso.model";
import { IPageList } from "../interfaces/pagina.list.inteface";
import { IPaginaHTML } from "../interfaces/pagina.html.interface";
import { IRepositorio } from "../interfaces/repositorio.interface";
import { CompromissoRepositoryLocalStorage } from "./repositories/compromisso.repository.local-storage";

class CompromissoPageList implements IPaginaHTML, IPageList {
  
   tabela: HTMLTableElement;

   constructor(private repositrorioCompromisso: IRepositorio<Compromisso>) {
      this.configurarElementos();
      this.atualizarTabela();
   }

   atualizarTabela(): void {
      const compromissos = this.repositrorioCompromisso.selecionarTodos();

      let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];

      compromissos.forEach(compromisso => {
         const novaLinha = corpoTabela.insertRow();

         Object.values(compromisso).forEach((valor: any) => {
               const novacelula = novaLinha.insertCell();
               novacelula.innerText = valor;
            }
         );

         this.criarBotaoEditar(novaLinha, compromisso);
         this.criarBotaoExcluir(novaLinha, compromisso);
      });
   }

   private criarBotaoEditar(novaLinha: HTMLTableRowElement, compromisso: Compromisso) {
      const celulaBotoes = novaLinha.insertCell();
      const btnEditar = document.createElement("a");
      btnEditar.innerText = "Editar";
      btnEditar.className = "btn btn-outline-success";

      btnEditar.addEventListener("click", () => {
         window.location.href = `compromisso.create.html?id=${compromisso.id}`;
      });

      celulaBotoes.appendChild(btnEditar);
   }

   private criarBotaoExcluir(novaLinha: HTMLTableRowElement, compromisso: Compromisso) {
      const celulaBotoes = novaLinha.insertCell();
      const btnExcluir = document.createElement("a");
      btnExcluir.innerText = "Excluir";
      btnExcluir.className = "btn btn-outline-info";

      btnExcluir.addEventListener("click", () => {
         this.repositrorioCompromisso.excluir(compromisso.id);
         window.location.reload();
      });

      celulaBotoes.appendChild(btnExcluir);
   }

   configurarElementos(): void {
      this.tabela = document.getElementById("tabela") as HTMLTableElement;
   }

}

new CompromissoPageList(new CompromissoRepositoryLocalStorage());