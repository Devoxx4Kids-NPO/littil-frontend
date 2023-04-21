import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  ApiV1UsersUserGet201Response,
  Configuration,
  User,
} from '../generated';
import {
  MOCK_SCHOOL_USER,
  MOCK_TEACHER_USER,
  MOCK_USERS,
} from './data/users.data.mock';

export class MockUserService {
  defaultHeaders: HttpHeaders = new HttpHeaders();
  configuration: Configuration = new Configuration();

  apiV1UsersUserIdGet(id: string): Observable<User> {
    if (id.match('9beae92a-')) {
      return of(MOCK_SCHOOL_USER);
    }
    if (id.match('59cc4dfa-')) {
      return of(MOCK_TEACHER_USER);
    }
    return of();
  }
  apiV1UsersUserGet(): Observable<User[]> {
    return of(MOCK_USERS);
  }
  apiV1UsersUserPost(): Observable<ApiV1UsersUserGet201Response> {
    return of(MOCK_SCHOOL_USER);
  }
  apiV1UsersUserIdDelete(id: string): Observable<any> {
    return of(true);
  }
}
