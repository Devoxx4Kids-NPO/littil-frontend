import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { initialize as initializeGoogleMaps } from '@googlemaps/jest-mocks';
import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { ButtonComponent } from '../../../components/button/button.component';
import { CoordinatesService } from '../../../services/coordinates/coordinates.service';
import { LittilSchoolService } from '../../../services/littil-school/littil-school.service';
import { LittilSearchService } from '../../../services/littil-search/littil-search.service';
import { LittilTeacherService } from '../../../services/littil-teacher/littil-teacher.service';
import {
  PermissionController,
  Roles,
} from '../../../services/permission.controller';
import { SearchComponent } from './search.component';

// TODO: add unit tests
describe('SearchComponent', () => {
  let spectator: Spectator<SearchComponent>;

  const createComponent = createRoutingFactory({
    component: SearchComponent,
    declarations: [MockComponent(ButtonComponent), MockComponent(MatCheckbox)],
    imports: [
      HttpClientTestingModule,
      ReactiveFormsModule,
      FormsModule,
    ],
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
