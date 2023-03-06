import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator';
import { OpenStreetMapService } from './open-street-map.service';

// TODO: add unit tests
describe.skip('OpenStreetMapService', () => {
  let service: OpenStreetMapService;
  let spectator: SpectatorHttp<OpenStreetMapService>;
  const createHttp = createHttpFactory(OpenStreetMapService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OpenStreetMapService],
    });
    service = TestBed.inject(OpenStreetMapService);
    spectator = createHttp();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
