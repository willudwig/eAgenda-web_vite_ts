import { IRepositorioSerializavel } from "../../interfaces/repositorio-serializavel.interface";
import { IRepositorio } from "../../interfaces/repositorio.interface";
import { Compromisso } from "../models/compromisso.model";

export class CompromissoRepositoryLocalStorage implements IRepositorio<Compromisso>, IRepositorioSerializavel 
{
   private readonly localStorage: Storage;
   private compromissos: Compromisso[];

   /**
    *
    */
   constructor() {
      this.localStorage = window.localStorage; 
      this.compromissos = this.selecionarTodos();
   }

   editar(id: string, registroEditado: Compromisso): void {
      const indexSelecionado = this.compromissos.findIndex(x => x.id === id);

      this.compromissos[indexSelecionado] = {
         id: id,
         assunto: registroEditado.assunto,
         local: registroEditado.local,
         contato: registroEditado.contato,
         data: registroEditado.data,
         hora: registroEditado.hora
      };

      this.gravar();
   }

   selecionarPorId(id: string): Compromisso | undefined {
      return this.compromissos.find(x => x.id === id);
   }

   public gravar(): void {
      const dadosJson = JSON.stringify(this.compromissos);
      this.localStorage.setItem("compromissos", dadosJson);
   }

   public inserir(dados: Compromisso): void {
      this.compromissos.push(dados);
      this.gravar();
   }

   public excluir(id: string): void {
      this.compromissos = this.compromissos.filter(x => x.id !== id); 
      this.gravar();
   }

   public selecionarTodos(): Compromisso[] {
      const dadosJson = this.localStorage.getItem("compromissos");

      if( !dadosJson )
         return [];

      return JSON.parse(dadosJson);
   }

}