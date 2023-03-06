import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator';
import { OpenStreetMapService } from './open-street-map.service';

// TODO: add unit tests
describe('OpenStreetMapService', () => {
  let spectator: SpectatorHttp<OpenStreetMapService>;
  const createHttp = createHttpFactory({
    service: OpenStreetMapService,
    imports: [HttpClientTestingModule],
    providers: [OpenStreetMapService],
  });

  beforeEach(() => {
    spectator = createHttp();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });
});
