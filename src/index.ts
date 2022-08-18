import { IPaginaHTML } from "./shared/interfaces/pagina.html.interface";

class Index implements IPaginaHTML{

   btnCadastrar: HTMLButtonElement; 

   constructor() {

      this.configurarElementos();
   }

   public configurarElementos(): void {

      this.btnCadastrar = document.getElementById("btnCadastrar") as HTMLButtonElement;
   }


}

new Index ();
