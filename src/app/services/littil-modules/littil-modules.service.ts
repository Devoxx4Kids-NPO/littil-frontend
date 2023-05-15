import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {
  ModuleService,
  Module,

} from "../../api/generated";

@Injectable({
  providedIn: 'root'
})
export class LittilModulesService {

  constructor(private moduleService: ModuleService) {}

  getAll(): Observable<Module[]> {
    return this.moduleService.apiV1ModulesGet();
  }
}
