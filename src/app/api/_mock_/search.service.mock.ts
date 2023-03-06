import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration, SearchResult } from '../generated';

export class MockSearchService {
  defaultHeaders: HttpHeaders = new HttpHeaders();
  configuration: Configuration = new Configuration();

  apiV1SearchGet(): Observable<SearchResult[]> {
    throw new Error('Method not implemented.');
  }
}
