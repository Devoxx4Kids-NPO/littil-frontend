import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiV1SchoolsGet200Response,
  School,
  SchoolModulesService,
  SchoolPostResource,
  SchoolService
} from '../../api/generated';
import { IHasManageableModules } from "../littil-modules/littil-modules-user.interface";
import { HttpResponse } from "@angular/common/http";

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

  delete(id: string): Observable<HttpResponse<any>> {
    return this.schoolService.apiV1SchoolsIdDelete(id, 'response');
  }

  getModules(id: string): Observable<any> {
    return this.schoolModulesService.apiV2SchoolsIdModulesGet(id);
  }

  addModules(schoolId: string, modules: string[]): Observable<any> {
    return this.schoolModulesService.apiV2SchoolsIdModulesPost(schoolId, modules);
  }

}
