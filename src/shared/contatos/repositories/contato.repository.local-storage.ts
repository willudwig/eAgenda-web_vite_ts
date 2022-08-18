import { IRepositorioSerializavel } from "../../interfaces/repositorio-serializavel.interface";
import { IRepositorio } from "../../interfaces/repositorio.interface";
import { Contato } from "../models/contato.model.js";

export class ContatoRepositoryLocalStorage implements IRepositorio<Contato>, IRepositorioSerializavel 
{
   private readonly localStorage: Storage;
   private contatos: Contato[];

   /**
    *
    */
   constructor() {
      this.localStorage = window.localStorage; 
      this.contatos = this.selecionarTodos();
   }

   editar(id: string, registroEditado: Contato): void {
      const indexSelecionado = this.contatos.findIndex(x => x.id === id);

      this.contatos[indexSelecionado] = {
         id: id,
         nome: registroEditado.nome,
         email: registroEditado.email,
         telefone: registroEditado.telefone,
         empresa: registroEditado.empresa,
         cargo: registroEditado.cargo
      };

      this.gravar();
   }

   selecionarPorId(id: string): Contato | undefined {
      return this.contatos.find(x => x.id === id);
   }

   public gravar(): void {
      const dadosJson = JSON.stringify(this.contatos);
      this.localStorage.setItem("contatos", dadosJson);
   }

   public inserir(dados: Contato): void {
      this.contatos.push(dados);
      this.gravar();
   }

   public excluir(id: string): void {
      this.contatos = this.contatos.filter(x => x.id !== id); 
      this.gravar();
   }

   public selecionarTodos(): Contato[] {
      const dadosJson = this.localStorage.getItem("contatos");

      if( !dadosJson )
         return [];

      return JSON.parse(dadosJson);
   }

}