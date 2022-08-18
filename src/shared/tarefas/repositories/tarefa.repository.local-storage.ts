import { IRepositorioSerializavel } from "../../interfaces/repositorio-serializavel.interface";
import { IRepositorio } from "../../interfaces/repositorio.interface";
import { Tarefa } from "../models/tarefa.model";


export class TarefaRepositoryLocalStorage implements IRepositorio<Tarefa>, IRepositorioSerializavel 
{
   private readonly localStorage: Storage;
   private tarefas: Tarefa[];

   /**
    *
    */
   constructor() {

      this.localStorage = window.localStorage; 
      this.tarefas = this.selecionarTodos();
   }

   public editar(id: string, registroEditado: Tarefa): void {
      const indexSelecionado = this.tarefas.findIndex(x => x.id === id);

      this.tarefas[indexSelecionado] = {
         id: id,
         titulo: registroEditado.titulo,
         dataCriacao: registroEditado.dataCriacao,
         dataConclusao: registroEditado.dataConclusao,
         prioridade: registroEditado.prioridade,
         porcentagem: registroEditado.porcentagem
      };

      this.gravar();
   }

   public gravar(): void {
      const dadosJson = JSON.stringify(this.tarefas);
      this.localStorage.setItem("tarefas", dadosJson);
   }

   public inserir(dados: Tarefa): void {
      this.tarefas.push(dados);
      this.gravar();
   }

   public excluir(id: string): void {
      this.tarefas = this.tarefas.filter(x => x.id !== id); 
      this.gravar();
   }

   public selecionarTodos(): Tarefa[] {
      const dadosJson = this.localStorage.getItem("tarefas");

      if( !dadosJson )
         return [];

      return JSON.parse(dadosJson);
   }

   public selecionarPorId(id: string): Tarefa | undefined{
      return this.tarefas.find(x => x.id === id);
   }

}