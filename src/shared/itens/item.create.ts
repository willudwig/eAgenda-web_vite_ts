import { Item } from "./models/item.model";
import { IPaginaHTML } from "../interfaces/pagina.html.interface";
import { IRepositorio } from "../interfaces/repositorio.interface";
import { IPaginaFormulario } from "../interfaces/pagina.ceate.interface";
import { ItemRepositoryLocalStorage } from "./repositories/item.repository.local-storage";
import { TarefaRepositoryLocalStorage } from "../tarefas/repositories/tarefa.repository.local-storage";

export class ItemPaginaCadastro implements IPaginaHTML, IPaginaFormulario
{
   private txtDescricao: HTMLInputElement;
   private selectTarefa: HTMLSelectElement;
   private btnSalvar: HTMLButtonElement;
   private idSelecionado: string;


   constructor(private repositorioItens: IRepositorio<Item>, id?:string) {
      this.configurarElementos();

      if(id) {
         this.idSelecionado = id;
         const itemSelecionado = this.repositorioItens.selecionarPorId(id);

         if (itemSelecionado) {
            this.preencherFormulario(itemSelecionado);
         }
      } 
   }

   private preencherFormulario(itemSelecionado: Item){
      this.txtDescricao.value = itemSelecionado.descricao;
      this.selectTarefa.value = itemSelecionado.tarefa;
   }

   private obterDadosFormulario(): Item {
      const descrcicao = this.txtDescricao.value;
      const tarefa = this.selectTarefa.value;

      let item = null;

      if (!this.idSelecionado)
         item = new Item(descrcicao, tarefa);
      else
         item = new Item(descrcicao, tarefa, this.idSelecionado);

      return item;
   }

   configurarElementos(): void {
      this.txtDescricao = document.getElementById("txtDescricao") as HTMLInputElement;
      this.selectTarefa = document.getElementById("selectTarefa") as HTMLSelectElement;
      this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

      //select tarefa
      const tarefas = new TarefaRepositoryLocalStorage().selecionarTodos();
      
      tarefas.forEach((x) => {
         const option = document.createElement("option");
         option.innerText = x.titulo;
         this.selectTarefa.appendChild(option);
      });

      this.btnSalvar.addEventListener( "click", (_evt) => this.gravarRegistros() );
   }

   gravarRegistros(): void {
      const item = this.obterDadosFormulario();
                          
      if(!this.idSelecionado) 
         this.repositorioItens.inserir(item);
      else
         this.repositorioItens.editar(item.id, item);

      window.location.href = "item.list.html";
   }
}

const params = new URLSearchParams(window.location.search); 
const id = params.get("id") as string;
new ItemPaginaCadastro(new ItemRepositoryLocalStorage(), id);