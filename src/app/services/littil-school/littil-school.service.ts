import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiV1SchoolsGet200Response,
  Module,
  School,
  SchoolModulesService,
  SchoolPostResource,
  SchoolService
} from '../../api/generated';
import { IHasManageableModules } from "../littil-modules/littil-modules-user.interface";

@Injectable({
  providedIn: 'root',
})
export class LittilSchoolService implements IHasManageableModules {
  constructor(
    private schoolService: SchoolService,
    private schoolModulesService: SchoolModulesService
  ) {
  }

  getById(id: string): Observable<ApiV1SchoolsGet200Response> {
    return this.schoolService.apiV1SchoolsIdGet(id);
  }

  getAll(): Observable<School[]> {
    return this.schoolService.apiV1SchoolsGet();
  }

  getByName(name: string): Observable<School[]> {
    return this.schoolService.apiV1SchoolsNameNameGet(name);
  }

  createOrUpdate(
    school: SchoolPostResource
  ): Observable<ApiV1SchoolsGet200Response> {
    return this.schoolService.apiV1SchoolsPut(school);
  }

  delete(id: string): Observable<any> {
    return this.schoolService.apiV1SchoolsIdDelete(id);
  }

  getModules(id: string): Observable<any> {
    return this.schoolModulesService.apiV1SchoolsIdModulesGet(id);
  }

  addModule(schoolId: string, module: Module): Observable<any> {
    return this.schoolModulesService.apiV1SchoolsIdModulesPost(schoolId, module);
  }

  removeModule(schoolId: string, moduleId: string): Observable<any> {
    return this.schoolModulesService.apiV1SchoolsIdModulesModuleIdDelete(moduleId, schoolId);
  }
}
