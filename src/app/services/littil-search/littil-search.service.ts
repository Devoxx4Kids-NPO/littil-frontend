import {SearchResult, SearchService} from '../../api/generated';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LittilSearchService {

  constructor(private searchService: SearchService) {}

  getSearchResult(lat: number, long: number, userType: string): Observable<SearchResult[]> {
    return this.searchService.apiV1SearchGet(lat, long, userType);
  }
}
