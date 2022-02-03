export default class SocketEvents {
     public events: any = [];
     public addEvent(name: string | number, call: any) {
       this.events[name] = call;
     }

     public callEvent(name: string | number, event: any) {
       if (!this.events[name]) {
         console.log("noregister");
         return;
       }
       this.events[name](event);
     }
}
