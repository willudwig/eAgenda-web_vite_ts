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
            compromissoList: resolve(root, "compromissos/compromisso.list.html"),
            contatofaList: resolve(root, "contatos/contato.list.html"),
            tarefaList: resolve(root, "tarefas/tarefa.list.html"),
            itemfaList: resolve(root, "itens/item.list.html"),

            compromissoCreate: resolve(root, "compromissos/compromisso.create.html"),
            contatoCreate: resolve(root, "contatos/contato.create.html"),
            tarefaCreate: resolve(root, "tarefas/tarefa.create.html"),
            itemCreate: resolve(root, "itens/item.create.html")
         }
      }
   },
   publicDir: "../public"
} );