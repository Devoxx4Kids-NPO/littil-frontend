import {Injectable} from "@angular/core";
import {Handler} from "./handler";

@Injectable()
export class EventBus {

  handlerMap: Map<String, Array<Handler>> = new Map

  on(name: string, listener: (payload: any) => void): Handler {
    let handler = new Handler(name, listener);
    let active: Array<Handler> = this.getEnsureObservable(name).filter(h => h.active);
    active.push(handler);
    this.handlerMap.set(name, active);
    return handler
  }

  broadcast(name: string, arg: any) {
    this.executeHandlers(name, arg);
    this.executeHandlers('BUSY', arg)
  }

  private executeHandlers(name: string, payload: any) {
    this.getEnsureObservable(name).forEach(handler => handler.execute(payload))
  }

  private getEnsureObservable(name: string): Array<Handler> {
    return this.handlerMap.get(name) || [];
  }

}
