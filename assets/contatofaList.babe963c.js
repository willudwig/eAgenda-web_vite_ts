var l=Object.defineProperty;var c=(i,t,o)=>t in i?l(i,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[t]=o;var n=(i,t,o)=>(c(i,typeof t!="symbol"?t+"":t,o),o);import"./modulepreload-polyfill.c7c6310f.js";/* empty css                      */import{C as d}from"./contato.repository.local-storage.64cd531f.js";class u{constructor(t){n(this,"tabela");this.repositrorioContatos=t,this.configurarElementos(),this.atualizarTabela()}atualizarTabela(){const t=this.repositrorioContatos.selecionarTodos();let o=this.tabela.getElementsByTagName("tbody")[0];t.forEach(a=>{const e=o.insertRow();Object.values(a).forEach(r=>{const s=e.insertCell();s.innerText=r}),this.criarBotaoEditar(e,a),this.criarBotaoExcluir(e,a)})}criarBotaoEditar(t,o){const a=t.insertCell(),e=document.createElement("a");e.innerText="Editar",e.className="btn btn-outline-success",e.addEventListener("click",()=>{window.location.href=`contato.create.html?id=${o.id}`}),a.appendChild(e)}criarBotaoExcluir(t,o){const a=t.insertCell(),e=document.createElement("a");e.innerText="Excluir",e.className="btn btn-outline-info",e.addEventListener("click",()=>{this.repositrorioContatos.excluir(o.id),window.location.reload()}),a.appendChild(e)}configurarElementos(){this.tabela=document.getElementById("tabela")}}new u(new d);