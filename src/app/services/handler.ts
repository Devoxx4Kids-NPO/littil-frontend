export class Handler {

  topic: string;
  callback: (payload: any) => void
  active: boolean = true;

  constructor(topic: string, fct: (payload: any) => void) {
    this.topic = topic
    if ( fct === undefined){
      throw Error('handler function cannot be null')
    }
    this.callback = fct
  }

  execute(payload: any) {
    if (this.active) {
      this.callback(payload)
    }
  }

  unregister() {
    this.active = false
  }
}
