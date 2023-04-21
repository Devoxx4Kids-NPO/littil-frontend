import { Observable } from "rxjs";
import { Module } from "../../api/generated";

export interface IHasManageableModules {
  getModules: (id: string) => Observable<Module[]>;
  addModule: (id: string, module: Module) => Observable<any>;
  removeModule: (id: string, moduleId: string) => Observable<any>;
}
