import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GuestTeacherPostResource, TeacherService } from '../../api/generated';
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

  createOrUpdate(teacher: GuestTeacherPostResource): Observable<any> {
    return this.teacherService.apiV1GuestTeachersPut(teacher);
  }

  delete(id: string): Observable<number> {
    return this.teacherService.apiV1GuestTeachersIdDelete(id);
  }
}
