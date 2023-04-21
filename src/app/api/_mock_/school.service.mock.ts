import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  ApiV1SchoolsGet200Response,
  Configuration,
  School,
  SchoolPostResource,
} from '../generated';
import { MOCK_SCHOOL, MOCK_SCHOOLS } from './data/schools.data.mock';

export class MockSchoolService {
  defaultHeaders: HttpHeaders = new HttpHeaders();
  configuration: Configuration = new Configuration();

  apiV1SchoolsGet(): Observable<School[]> {
    return of(MOCK_SCHOOLS);
  }
  apiV1SchoolsIdDelete(id: string): Observable<any> {
    return of(true);
  }
  apiV1SchoolsIdGet(id: string): Observable<ApiV1SchoolsGet200Response> {
    if (id.match('9beae92a-')) {
      return of(MOCK_SCHOOL);
    }
    return of();
  }
  apiV1SchoolsNameNameGet(name: string): Observable<School[]> {
    if (name.match('Schoolname')) {
      return of(MOCK_SCHOOLS);
    }
    return of();
  }
  apiV1SchoolsPut(
    school?: SchoolPostResource
  ): Observable<ApiV1SchoolsGet200Response> {
    if (school) {
      return of(MOCK_SCHOOL);
    }
    return of();
  }
}
