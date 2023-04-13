import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { School, SchoolService } from '../../api/generated';
import { LittilSchoolService } from './littil-school.service';

describe('LittilSchoolService', () => {
  let baseUrl = 'http://localhost:8080';
  let spectator: SpectatorHttp<LittilSchoolService>;
  const createHttp = createHttpFactory({
    service: LittilSchoolService,
    imports: [HttpClientTestingModule],
    providers: [SchoolService],
  });

  beforeEach(() => {
    spectator = createHttp();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('getById', () => {
    it('should get school by id', () => {
      spectator.service.getById('123').subscribe();
      spectator.expectOne(baseUrl + '/api/v1/schools/123', HttpMethod.GET);
    });
  });

  describe('getAll', () => {
    it('should get all schools', () => {
      spectator.service.getAll().subscribe();
      spectator.expectOne(baseUrl + '/api/v1/schools', HttpMethod.GET);
    });
  });

  describe('createOrUpdate', () => {
    it('should create or update school', () => {
      spectator.service
        .createOrUpdate({
          id: undefined,
          name: 'Schoolname',
          address: 'Street 1',
          postalCode: '1000AA',
          firstName: 'Firstname',
          prefix: 'Prefix',
          surname: 'Surname',
        } as School)
        .subscribe();
      spectator.expectOne(baseUrl + '/api/v1/schools', HttpMethod.PUT);
    });
  });

  describe('delete', () => {
    it('should delete school', () => {
      spectator.service.delete('123').subscribe();
      spectator.expectOne(baseUrl + '/api/v1/schools/123', HttpMethod.DELETE);
    });
  });

  describe('modules', () => {
    it('should get modules for school', () => {
      spectator.service.getModules('123').subscribe();
      spectator.expectOne(baseUrl + '/api/v1/schools/123/modules', HttpMethod.GET);
    });
    it('should add a module for a school', () => {
      spectator.service.addModule('123', {
        id: "test",
        name: "name"
      }).subscribe();
      spectator.expectOne(baseUrl + '/api/v1/schools/123/modules', HttpMethod.POST);
    });
    it('should delete a module for a school', () => {
      spectator.service.removeModule('123', '567').subscribe();
      spectator.expectOne(baseUrl + '/api/v1/schools/123/modules/567', HttpMethod.DELETE);
    });
  });
});
