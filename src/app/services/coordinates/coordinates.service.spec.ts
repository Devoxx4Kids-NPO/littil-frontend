import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator';
import { CoordinatesService } from './coordinates.service';
import { OpenStreetMapService } from './open-street-map.service';

// TODO: add unit tests
describe('CoordinatesService', () => {
  let spectator: SpectatorHttp<CoordinatesService>;
  const createHttp = createHttpFactory({
    service: OpenStreetMapService,
    imports: [HttpClientTestingModule],
    providers: [CoordinatesService],
  });

  beforeEach(() => {
    spectator = createHttp();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });
});
