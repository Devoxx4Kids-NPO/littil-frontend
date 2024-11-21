import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initialize as initializeGoogleMaps } from '@googlemaps/jest-mocks';
import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { ModalController } from '../../../components/modal/modal.controller';
import { CoordinatesService } from '../../../services/coordinates/coordinates.service';
import { LittilSchoolService } from '../../../services/littil-school/littil-school.service';
import { LittilSearchService } from '../../../services/littil-search/littil-search.service';
import { LittilTeacherService } from '../../../services/littil-teacher/littil-teacher.service';
import { PermissionController, Roles } from '../../../services/permission.controller';
import { SearchComponent } from './search.component';

// TODO: add unit tests
describe('SearchComponent', () => {
  let spectator: Spectator<SearchComponent>;

  const createComponent = createRoutingFactory({
    component: SearchComponent,
    declareComponent: false,
    imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    providers: [
      MockProvider(PermissionController, {
        getRoleType: () => Roles.GuestTeacher,
        getRoleId: () => '',
      }),
      MockProvider(LittilSearchService, {
        getSearchResult: () => of(),
      }),
      MockProvider(CoordinatesService, {
        getCoordinates: () => of(),
      }),
      MockProvider(LittilSchoolService, {
        getById: () => of(),
      }),
      MockProvider(LittilTeacherService, {
        getById: () => of(),
      }),
      MockProvider(ModalController),
    ],
  });

  beforeAll(() => {
    initializeGoogleMaps();
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
