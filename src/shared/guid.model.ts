export class Guid{

   gerarNovoID() {

      const dateStr = Date.now().toString(36);

      const randonStr = Math.random().toString(36).substring(2, 8);

      return `${dateStr}-${randonStr}`;
   }
   
}