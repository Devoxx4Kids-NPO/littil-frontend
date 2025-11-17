import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiV1GuestTeachersGet200Response,
  GuestTeacher,
  GuestTeacherPostResource,
  Module,
  TeacherModulesService,
  TeacherService,
} from '../../api/generated';
import { IHasManageableModules } from "../littil-modules/littil-modules-user.interface";
import { HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class LittilTeacherService implements IHasManageableModules {
  constructor(
    private teacherService: TeacherService,
    private teacherModulesService: TeacherModulesService
  ) {
  }

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

  delete(id: string): Observable<HttpResponse<any>> {
    return this.teacherService.apiV1GuestTeachersIdDelete(id,'response');
  }

  getModules(id: string): Observable<Module[]> {
    return this.teacherModulesService.apiV2GuestTeachersIdModulesGet(id);
  }

  addModules(teacherId: string, modules: string[]): Observable<any> {
    return this.teacherModulesService.apiV2GuestTeachersIdModulesPost(teacherId, modules);
  }

}
