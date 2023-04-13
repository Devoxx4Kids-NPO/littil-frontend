import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  ApiV1SchoolsGet200Response,
  School,
  SchoolPostResource,
  SchoolService,
  SchoolModulesService, Module
} from '../../api/generated';

@Injectable({
  providedIn: 'root',
})
export class LittilSchoolService {
  constructor(
    private schoolService: SchoolService,
    private schoolModulesService: SchoolModulesService
  ) {}

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
    return this.schoolModulesService.apiV1SchoolsSchoolIdModulesGet(id);
  }

  addModule(schoolId: string, module: Module): Observable<any> {
    return this.schoolModulesService.apiV1SchoolsSchoolIdModulesPost(schoolId, module);
  }

  removeModule(schoolId: string, moduleId: string): Observable<any> {
    return this.schoolModulesService.apiV1SchoolsSchoolIdModulesModuleIdDelete(moduleId, schoolId);
  }
}
