import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApiV1UsersUserGet201Response,
  Configuration,
  User,
} from '../generated';

export class MockUserService {
  defaultHeaders: HttpHeaders = new HttpHeaders();
  configuration: Configuration = new Configuration();

  apiV1UsersUserIdGet(): Observable<User> {
    throw new Error('Method not implemented.');
  }
  apiV1UsersUserGet(): Observable<User[]> {
    throw new Error('Method not implemented.');
  }
  apiV1UsersUserPost(): Observable<ApiV1UsersUserGet201Response> {
    throw new Error('Method not implemented.');
  }
  apiV1UsersUserIdDelete(): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
