import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApiV1UserSettingsGet201Response,
  Configuration,
  School,
  UserSetting,
} from '../generated';

export class MockUserSettingsService {
  defaultHeaders: HttpHeaders = new HttpHeaders();
  configuration: Configuration = new Configuration();

  apiV1UserSettingsGet(): Observable<UserSetting[]> {
    throw new Error('Method not implemented.');
  }
  apiV1UserSettingsKeyGet(): Observable<School[]> {
    throw new Error('Method not implemented.');
  }
  apiV1UserSettingsKeyPut(): Observable<ApiV1UserSettingsGet201Response> {
    throw new Error('Method not implemented.');
  }
  apiV1UserSettingsPost(): Observable<ApiV1UserSettingsGet201Response> {
    throw new Error('Method not implemented.');
  }
  apiV1UserSettingsKeyDelete(): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
