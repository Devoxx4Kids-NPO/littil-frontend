import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Configuration, SearchResult } from '../generated';
import { MOCK_SEARCH } from './data/search.data.mock';

export class MockSearchService {
  defaultHeaders: HttpHeaders = new HttpHeaders();
  configuration: Configuration = new Configuration();

  apiV1SearchGet(): Observable<SearchResult[]> {
    return of(MOCK_SEARCH);
  }
}
