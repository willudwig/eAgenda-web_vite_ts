import { EntidadeBase } from "../../entidade.model.js";

export class Item extends EntidadeBase  
{
   public descricao: string;
   public tarefa: string;
   public status?: "Aberto" | "Concluído";

   /**
    *
    */
   constructor(descrcicao: string, tarefa: string,  id?: string) {
      super();

      if(id) {
         this.id = id;
      }
      
      this.descricao = descrcicao;
      this.tarefa = tarefa;
      this.status = "Aberto";
   }

}