import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  ApiV1UserSettingsGet201Response,
  Configuration,
  UserSetting,
} from '../generated';
import {
  MOCK_USER_SETTING,
  MOCK_USER_SETTINGS,
} from './data/user-settings.data.mock';

export class MockUserSettingsService {
  defaultHeaders: HttpHeaders = new HttpHeaders();
  configuration: Configuration = new Configuration();

  apiV1UserSettingsGet(): Observable<UserSetting[]> {
    return of(MOCK_USER_SETTINGS);
  }
  apiV1UserSettingsKeyGet(key: string): Observable<UserSetting[]> {
    return of(MOCK_USER_SETTINGS);
  }
  apiV1UserSettingsKeyPut(
    key: string
  ): Observable<ApiV1UserSettingsGet201Response> {
    return of(MOCK_USER_SETTING);
  }
  apiV1UserSettingsPost(): Observable<ApiV1UserSettingsGet201Response> {
    return of(MOCK_USER_SETTING);
  }
  apiV1UserSettingsKeyDelete(key: string): Observable<any> {
    return of(true);
  }
}
