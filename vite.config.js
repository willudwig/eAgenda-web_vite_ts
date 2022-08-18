import { resolve } from "path";
import { defineConfig } from "vite";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default defineConfig ( {
   base: "/projeto-vite-ts/",
   root: root,
   build: { 
      outDir: outDir,
      emptyOutDir: true,
      rollupOptions: {
         input: {
            index: resolve(root, "index.html"),
            tarefaList: resolve(root, "tarefas/tarefa.list.html"),
            itemfaList: resolve(root, "itens/item.list.html"),
            contatofaList: resolve(root, "contatos/contato.list.html"),
            compromissoList: resolve(root, "compromissos/comprmisso.list.html"),

            tarefaCreate: resolve(root, "tarefas/tarefa.create.html"),
            itemCreate: resolve(root, "itens/item.create.html"),
            contatoCreate: resolve(root, "contatos/contato.create.html"),
            compromissoCreate: resolve(root, "compromissos/compromisso.create.html"),
           
            
         }
      }
   },
   publicDir: "../public"
} );