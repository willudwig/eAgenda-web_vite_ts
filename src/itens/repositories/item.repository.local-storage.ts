import { IRepositorioSerializavel } from "../../shared/interfaces/repositorio-serializavel.interface";
import { IRepositorio } from "../../shared/interfaces/repositorio.interface";
import { Item } from "../models/item.model";

export class ItemRepositoryLocalStorage implements IRepositorio<Item>, IRepositorioSerializavel 
{
   private readonly localStorage: Storage;
   private itens: Item[];

   /**
    *
    */
   constructor() {

      this.localStorage = window.localStorage; 
      this.itens = this.selecionarTodos();
   }

   editar(id: string, registroEditado: Item): void {
      const indexSelecionado = this.itens.findIndex(x => x.id === id);

      this.itens[indexSelecionado] = {
         id: id,
         descricao: registroEditado.descricao,
         tarefa: registroEditado.tarefa,
         status: registroEditado.status,
      };

      this.gravar();
   }
   
   selecionarPorId(id: string): Item | undefined {
      return this.itens.find(x => x.id === id);
   }

   public gravar(): void {
      const dadosJson = JSON.stringify(this.itens);
      this.localStorage.setItem("items", dadosJson);
   }

   public inserir(registro: Item): void {
      this.itens.push(registro);
      this.gravar();
   }

   public excluir(id: string): void {
      this.itens = this.itens.filter(x => x.id !== id); 
      this.gravar();
   }

   public selecionarTodos(): Item[] {
      const dadosJson = this.localStorage.getItem("items");

      if( !dadosJson )
         return [];

      return JSON.parse(dadosJson);
   }

}