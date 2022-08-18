import { EntidadeBase } from "../../shared/entidade.model";
import { Prioridade } from "./prioridade.enum";

export class Tarefa extends EntidadeBase  
{
   public titulo: string;
   public dataCriacao: string;
   public dataConclusao?: string;
   public prioridade: Prioridade;
   public porcentagem: string;

   /**
    *
    */
   constructor(titulo: string, prioridade: Prioridade, porcentagem: string, id?: string) {
      super();

      if(id) {
         this.id = id;
      }

      const data = new Date();
      this.titulo = titulo;
      this.dataCriacao = data.getDate() + " / " + (data.getMonth() + 1) + " / " + data.getFullYear();
      this.dataConclusao = "-";
      this.prioridade = prioridade;
      this.porcentagem = porcentagem;
   }

}