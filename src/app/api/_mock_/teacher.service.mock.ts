import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  ApiV1GuestTeachersGet200Response,
  Configuration,
  GuestTeacher,
  GuestTeacherPostResource,
} from '../generated';
import {
  MOCK_GUEST_TEACHER,
  MOCK_GUEST_TEACHERS,
} from './data/teachers.data.mock';

export class MockTeacherService {
  defaultHeaders: HttpHeaders = new HttpHeaders();
  configuration: Configuration = new Configuration();

  apiV1GuestTeachersGet(): Observable<GuestTeacher[]> {
    return of(MOCK_GUEST_TEACHERS);
  }
  apiV1GuestTeachersIdDelete(id: string): Observable<any> {
    return of(true);
  }
  apiV1GuestTeachersIdGet(id: string): Observable<GuestTeacher> {
    if (id.match('59cc4dfa-')) {
      return of(MOCK_GUEST_TEACHER);
    }
    return of();
  }
  apiV1GuestTeachersPut(
    teacher?: GuestTeacherPostResource
  ): Observable<ApiV1GuestTeachersGet200Response> {
    if (teacher) {
      return of(MOCK_GUEST_TEACHER);
    }
    return of();
  }
}
