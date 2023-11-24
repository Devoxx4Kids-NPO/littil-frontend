import { Observable } from "rxjs";
import { Module } from "../../api/generated";

export interface IHasManageableModules {
  getModules: (id: string) => Observable<Module[]>;
  addModules: (id: string, modules: string[]) => Observable<any>;
}
