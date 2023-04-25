import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { SearchService } from '../../api/generated';
import { LittilSearchService } from './littil-search.service';

describe('LittilSearchService', () => {
  let baseUrl = 'http://localhost:8080';
  let spectator: SpectatorHttp<LittilSearchService>;
  const createHttp = createHttpFactory({
    service: LittilSearchService,
    imports: [HttpClientTestingModule],
    providers: [SearchService],
  });

  beforeEach(() => {
    spectator = createHttp();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('getById', () => {
    it('should get search results', () => {
      spectator.service.getSearchResult(Array.of('Scratch'),52.3, 4.5, 300,'userType').subscribe();
      spectator.expectOne(
        baseUrl + '/api/v1/search?expectedModules=Scratch&lat=52.3&long=4.5&maxDistance=300&userType=userType',
        HttpMethod.GET
      );
    });
  });
});
