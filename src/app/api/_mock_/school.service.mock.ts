import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApiV1SchoolsGet200Response,
  Configuration,
  School,
  SchoolPostResource,
} from '../generated';

export class MockSchoolService {
  defaultHeaders: HttpHeaders = new HttpHeaders();
  configuration: Configuration = new Configuration();

  apiV1SchoolsGet(): Observable<School[]> {
    throw new Error('Method not implemented.');
  }
  apiV1SchoolsIdDelete(id: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  apiV1SchoolsIdGet(id: string): Observable<ApiV1SchoolsGet200Response> {
    throw new Error('Method not implemented.');
  }
  apiV1SchoolsNameNameGet(name: string): Observable<School[]> {
    throw new Error('Method not implemented.');
    // return of([]);
  }
  apiV1SchoolsPut(
    school?: SchoolPostResource
  ): Observable<ApiV1SchoolsGet200Response> {
    throw new Error('Method not implemented.');
  }
}
