import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  ApiV1GuestTeachersGet200Response,
  GuestTeacherPostResource, Module, TeacherModulesService,
  TeacherService,
} from '../../api/generated';
import {GuestTeacher} from '../../api/generated';

@Injectable({
  providedIn: 'root',
})
export class LittilTeacherService {
  constructor(
    private teacherService: TeacherService,
    private teacherModulesService: TeacherModulesService
  ) {}

  getById(id: string): Observable<GuestTeacher> {
    return this.teacherService.apiV1GuestTeachersIdGet(id);
  }

  getAll(): Observable<GuestTeacher[]> {
    return this.teacherService.apiV1GuestTeachersGet();
  }

  createOrUpdate(
    teacher: GuestTeacherPostResource
  ): Observable<ApiV1GuestTeachersGet200Response> {
    return this.teacherService.apiV1GuestTeachersPut(teacher);
  }

  delete(id: string): Observable<any> {
    return this.teacherService.apiV1GuestTeachersIdDelete(id);
  }

  getModules(id: string): Observable<Module[]> {
    return this.teacherModulesService.apiV1GuestTeachersGuestTeacherIdModulesGet(id);
  }

  addModule(teacherId: string, module: Module): Observable<any> {
    return this.teacherModulesService.apiV1GuestTeachersGuestTeacherIdModulesPost(teacherId, module);
  }

  removeModule(teacherId: string, moduleId: string): Observable<any> {
    return this.teacherModulesService.apiV1GuestTeachersGuestTeacherIdModulesModuleIdDelete(teacherId, moduleId);
  }

}
