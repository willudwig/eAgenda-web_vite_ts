import { Contato } from "./models/contato.model";
import { IPageList } from "../shared/interfaces/pagina.list.inteface";
import { IPaginaHTML } from "../shared/interfaces/pagina.html.interface";
import { IRepositorio } from "../shared/interfaces/repositorio.interface";
import { ContatoRepositoryLocalStorage } from "./repositories/contato.repository.local-storage";

class ContatoPageList implements IPaginaHTML, IPageList {
  
   tabela: HTMLTableElement;

   constructor(private repositrorioContatos: IRepositorio<Contato>) {
      this.configurarElementos();
      this.atualizarTabela();
   }

   atualizarTabela(): void {
      const contatos = this.repositrorioContatos.selecionarTodos();

      let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];

      contatos.forEach(contato => {
         const novaLinha = corpoTabela.insertRow();

         Object.values(contato).forEach((valor: any) => {
               const novacelula = novaLinha.insertCell();
               novacelula.innerText = valor;
            }
         );

         this.criarBotaoEditar(novaLinha, contato);
         this.criarBotaoExcluir(novaLinha, contato);
      });
   }

   private criarBotaoEditar(novaLinha: HTMLTableRowElement, contato: Contato) {
      const celulaBotoes = novaLinha.insertCell();
      const btnEditar = document.createElement("a");
      btnEditar.innerText = "Editar";
      btnEditar.className = "btn btn-outline-success";

      btnEditar.addEventListener("click", () => {
         window.location.href = `contato.create.html?id=${contato.id}`;
      });

      celulaBotoes.appendChild(btnEditar);
   }

   private criarBotaoExcluir(novaLinha: HTMLTableRowElement, contato: Contato) {
      const celulaBotoes = novaLinha.insertCell();
      const btnExcluir = document.createElement("a");
      btnExcluir.innerText = "Excluir";
      btnExcluir.className = "btn btn-outline-info";

      btnExcluir.addEventListener("click", () => {
         this.repositrorioContatos.excluir(contato.id);
         window.location.reload();
      });

      celulaBotoes.appendChild(btnExcluir);
   }

   configurarElementos(): void {
      this.tabela = document.getElementById("tabela") as HTMLTableElement;
   }

}

new ContatoPageList(new ContatoRepositoryLocalStorage());