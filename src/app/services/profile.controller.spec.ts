import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';
import { OpenStreetMapService } from './coordinates/open-street-map.service';
import { LittilSchoolService } from './littil-school/littil-school.service';
import { LittilTeacherService } from './littil-teacher/littil-teacher.service';
import { ProfileController } from './profile.controller';

// TODO: add unit tests
describe('ProfileController', () => {
  let spectator: SpectatorService<ProfileController>;
  const createController = createServiceFactory({
    service: ProfileController,
    imports: [HttpClientTestingModule],
    providers: [
      MockProvider(OpenStreetMapService),
      MockProvider(LittilTeacherService),
      MockProvider(LittilSchoolService),
    ],
  });

  beforeEach(() => {
    spectator = createController();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });
});
