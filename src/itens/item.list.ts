import { Item } from "./models/item.model";
import { IPageList } from "../shared/interfaces/pagina.list.inteface";
import { IPaginaHTML } from "../shared/interfaces/pagina.html.interface";
import { IRepositorio } from "../shared/interfaces/repositorio.interface";
import { ItemRepositoryLocalStorage } from "./repositories/item.repository.local-storage";

class ItemPageList implements IPaginaHTML, IPageList {
  
   tabela: HTMLTableElement;
   clicado: number;

   constructor(private repositrorioItens: IRepositorio<Item>) {
      this.configurarElementos();
      this.atualizarTabela();
      this.clicado = 0;
   }

   atualizarTabela(): void {
      const itens = this.repositrorioItens.selecionarTodos();
      let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];

      itens.forEach(item => {

         const novaLinha = corpoTabela.insertRow();

         Object.values(item).forEach((valor: any) => {
               const novacelula = novaLinha.insertCell();
               novacelula.innerText = valor;
            }
         );

         this.criarCheckBox(novaLinha, item);
         this.criarBotaoEditar(novaLinha, item);
         this.criarBotaoExcluir(novaLinha, item);
      });

   }

   private criarCheckBox(novaLinha: HTMLTableRowElement, item: Item) {
      const celulaBotoes = novaLinha.insertCell();
      const check = document.createElement("input");
      check.type = "checkbox";
      check.name = "check";
      check.className = "checkbox";

      check.addEventListener("click", () => {
       this.alternarStatusCheckBox(novaLinha, check, item);
      });
      
      this.verificarCheck(check, item);
      celulaBotoes.appendChild(check);
   }

   private criarBotaoEditar(novaLinha: HTMLTableRowElement, item: Item) {
      const celulaBotoes = novaLinha.insertCell();
      const btnEditar = document.createElement("a");
      btnEditar.innerText = "Editar";
      btnEditar.className = "btn btn-outline-success";

      btnEditar.addEventListener("click", () => {
         window.location.href = `item.create.html?id=${item.id}`;
      });

      celulaBotoes.appendChild(btnEditar);
   }

   private criarBotaoExcluir(novaLinha: HTMLTableRowElement, item: Item) {
      const celulaBotoes = novaLinha.insertCell();
      const btnExcluir = document.createElement("a");
      btnExcluir.innerText = "Excluir";
      btnExcluir.className = "btn btn-outline-info";

      btnExcluir.addEventListener("click", () => {
         this.repositrorioItens.excluir(item.id);
         window.location.reload();
      });

      celulaBotoes.appendChild(btnExcluir);
   }

   verificarCheck(checkbox: HTMLInputElement, item: Item) {
      if(item.status == "Concluído")
         checkbox.checked = true;
      else
         checkbox.checked = false;
   }

   private alternarStatusCheckBox(novaLinha: HTMLTableRowElement, check: HTMLInputElement, item: Item) {
      switch(this.clicado) {
         case 0:
            check.checked = true;
            item.status = "Concluído";
            this.clicado = 1;
         break;
         case 1:
            check.checked = false;
            item.status = "Aberto";
            this.clicado = 0;
         break;
      }

      if(item.status !== undefined)
         novaLinha.cells[3].innerText = item.status;

      this.repositrorioItens.editar(item.id, item);
   }

   configurarElementos(): void {
      this.tabela = document.getElementById("tabela") as HTMLTableElement;
   }

}

new ItemPageList(new ItemRepositoryLocalStorage());