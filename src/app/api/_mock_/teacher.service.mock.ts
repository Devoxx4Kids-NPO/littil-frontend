import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApiV1GuestTeachersGet200Response,
  Configuration,
  GuestTeacher,
  GuestTeacherPostResource,
} from '../generated';

export class MockTeacherService {
  defaultHeaders: HttpHeaders = new HttpHeaders();
  configuration: Configuration = new Configuration();

  apiV1GuestTeachersGet(): Observable<GuestTeacher[]> {
    throw new Error('Method not implemented.');
  }
  apiV1GuestTeachersIdDelete(id: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  apiV1GuestTeachersIdGet(id: string): Observable<GuestTeacher> {
    throw new Error('Method not implemented.');
  }
  apiV1GuestTeachersPut(
    teacher?: GuestTeacherPostResource
  ): Observable<ApiV1GuestTeachersGet200Response> {
    throw new Error('Method not implemented.');
  }
}
