import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherService } from '../../api/generated';
import { GuestTeacher } from '../../api/generated/model/guestTeacher';

@Injectable({
  providedIn: 'root',
})
export class LittilTeacherService {
  constructor(private teacherService: TeacherService) {}

  getById(id: string): Observable<GuestTeacher> {
    return this.teacherService.apiV1GuestTeachersIdGet(id);
  }

  getAll(): Observable<GuestTeacher[]> {
    return this.teacherService.apiV1GuestTeachersGet();
  }

  createOrUpdate(teacher: GuestTeacher): Observable<GuestTeacher> {
    return this.teacherService.apiV1GuestTeachersPut(teacher);
  }

  delete(id: string): Observable<any> {
    return this.teacherService.apiV1GuestTeachersIdDelete(id);
  }
}
