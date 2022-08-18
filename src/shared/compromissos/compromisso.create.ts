import { Compromisso } from "./models/compromisso.model";
import { IPaginaHTML } from "../interfaces/pagina.html.interface";
import { IRepositorio } from "../interfaces/repositorio.interface";
import { IPaginaFormulario } from "../interfaces/pagina.ceate.interface";
import { ContatoRepositoryLocalStorage } from "../contatos/repositories/contato.repository.local-storage";
import { CompromissoRepositoryLocalStorage } from "./repositories/compromisso.repository.local-storage";

export class CompromissoPaginaCadastro implements IPaginaHTML, IPaginaFormulario
{
   private txtAssunto: HTMLInputElement;
   private txtLocal: HTMLInputElement;
   private selectContato: HTMLSelectElement;
   private txtData: HTMLInputElement;
   private txtHora: HTMLInputElement;
   private btnSalvar: HTMLButtonElement;
   private idSelecionado: string;

   constructor(private repositorioCompromissos: IRepositorio<Compromisso>, id?:string) {
      this.configurarElementos();

      if(id) {
         this.idSelecionado = id;
         const compromissoSelecionado = this.repositorioCompromissos.selecionarPorId(id);

         if (compromissoSelecionado) {
            this.preencherFormulario(compromissoSelecionado);
         }
      }
   }

   private obterDadosFormulario(): Compromisso {
      const assunto = this.txtAssunto.value; 
      const local = this.txtLocal.value;
      const contato = this.selectContato.value;
      const data = this.txtData.value;
      const hora = this.txtHora.value ;

      let compromisso = null;

      if (!this.idSelecionado)
         compromisso = new Compromisso(assunto, local, contato, data, hora);
      else
      compromisso = new Compromisso(assunto, local, contato, data, hora, this.idSelecionado);

      return compromisso;
   }

   private preencherFormulario(compromissoSelecionado: Compromisso){
      this.txtAssunto.value = compromissoSelecionado.assunto;
      this.txtLocal.value = compromissoSelecionado.local;
      this.selectContato.value = compromissoSelecionado.contato;
      this.txtData.value = compromissoSelecionado.data;
      this.txtHora.value = compromissoSelecionado.hora;
   }

   configurarElementos(): void {
      this.txtAssunto = document.getElementById("txtAssunto") as HTMLInputElement;
      this.txtLocal = document.getElementById("txtLocal") as HTMLInputElement;
      this.selectContato = document.getElementById("contatos") as HTMLSelectElement;
      this.txtData = document.getElementById("txtData") as HTMLInputElement;
      this.txtHora = document.getElementById("txtHora") as HTMLInputElement;
      this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

      //adiciona os contatos no select
      const contatos = new ContatoRepositoryLocalStorage().selecionarTodos();
      contatos.forEach( (x) => {
         const option = document.createElement("option");
         option.innerText = x.nome;
         this.selectContato.appendChild(option);
      });
      
      this.btnSalvar.addEventListener( "click", (_evt) => this.gravarRegistros() );
   }

   gravarRegistros(): void {
      const compromisso = this.obterDadosFormulario();

      if(!this.idSelecionado)
         this.repositorioCompromissos.inserir(compromisso);
      else
         this.repositorioCompromissos.editar(compromisso.id, compromisso);

      window.location.href = "compromisso.list.html";
   }
   
}

const params = new URLSearchParams(window.location.search); 
const id = params.get("id") as string;

new CompromissoPaginaCadastro(new CompromissoRepositoryLocalStorage(), id);