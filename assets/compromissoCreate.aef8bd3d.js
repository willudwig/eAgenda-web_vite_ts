var h=Object.defineProperty;var m=(e,t,o)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var s=(e,t,o)=>(m(e,typeof t!="symbol"?t+"":t,o),o);import"./modulepreload-polyfill.c7c6310f.js";/* empty css                      */import{E as d}from"./entidade.model.05f7a246.js";import{C as u}from"./compromisso.repository.local-storage.8ff52396.js";import{C as p}from"./contato.repository.local-storage.64cd531f.js";class c extends d{constructor(o,a,n,r,i,l){super();s(this,"assunto");s(this,"local");s(this,"contato");s(this,"data");s(this,"hora");l&&(this.id=l),this.assunto=o,this.local=a,this.contato=n,this.data=r,this.hora=i}}class x{constructor(t,o){s(this,"txtAssunto");s(this,"txtLocal");s(this,"selectContato");s(this,"txtData");s(this,"txtHora");s(this,"btnSalvar");s(this,"idSelecionado");if(this.repositorioCompromissos=t,this.configurarElementos(),o){this.idSelecionado=o;const a=this.repositorioCompromissos.selecionarPorId(o);a&&this.preencherFormulario(a)}}obterDadosFormulario(){const t=this.txtAssunto.value,o=this.txtLocal.value,a=this.selectContato.value,n=this.txtData.value,r=this.txtHora.value;let i=null;return this.idSelecionado?i=new c(t,o,a,n,r,this.idSelecionado):i=new c(t,o,a,n,r),i}preencherFormulario(t){this.txtAssunto.value=t.assunto,this.txtLocal.value=t.local,this.selectContato.value=t.contato,this.txtData.value=t.data,this.txtHora.value=t.hora}configurarElementos(){this.txtAssunto=document.getElementById("txtAssunto"),this.txtLocal=document.getElementById("txtLocal"),this.selectContato=document.getElementById("contatos"),this.txtData=document.getElementById("txtData"),this.txtHora=document.getElementById("txtHora"),this.btnSalvar=document.getElementById("btnSalvar"),new p().selecionarTodos().forEach(o=>{const a=document.createElement("option");a.innerText=o.nome,this.selectContato.appendChild(a)}),this.btnSalvar.addEventListener("click",o=>this.gravarRegistros())}gravarRegistros(){const t=this.obterDadosFormulario();this.idSelecionado?this.repositorioCompromissos.editar(t.id,t):this.repositorioCompromissos.inserir(t),window.location.href="compromisso.list.html"}}const v=new URLSearchParams(window.location.search),C=v.get("id");new x(new u,C);