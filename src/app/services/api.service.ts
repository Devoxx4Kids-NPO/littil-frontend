import { Injectable } from '@angular/core';
import {School, SchoolService, Teacher, TeacherService} from "../api/generated";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private schoolService: SchoolService,
    private teacherService: TeacherService) {}

  getSchool(id: string): Observable<School> {
    return this.schoolService.apiV1SchoolIdGet(id);
  }

  getTeacher(id: string): Observable<Teacher> {
    return this.teacherService.apiV1TeacherIdGet(id);
  }
}
