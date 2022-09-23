import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { School, SchoolService } from '../../api/generated';
import { LittilSchoolService } from './littil-school.service';

describe('LittilSchoolService', () => {
  let baseUrl = 'http://localhost/';
  let service: LittilSchoolService;
  let spectator: SpectatorHttp<LittilSchoolService>;
  const createHttp = createHttpFactory(LittilSchoolService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SchoolService],
    });
    service = TestBed.inject(LittilSchoolService);
    spectator = createHttp();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getById', () => {
    it('should get school by id', () => {
      spectator.service.getById('123').subscribe();
      spectator.expectOne(baseUrl + 'api/v1/schools/123', HttpMethod.GET);
    });
  });

  describe('getAll', () => {
    it('should get all schools', () => {
      spectator.service.getAll().subscribe();
      spectator.expectOne(baseUrl + 'api/v1/schools', HttpMethod.GET);
    });
  });

  describe('create', () => {
    it('should create new school', () => {
      spectator.service
        .create({
          id: undefined,
          name: 'Schoolname',
          address: 'Street 1',
          postalCode: '1000AA',
          contactPersonName: 'Contactperson name',
          contactPersonEmail: 'email@email.nl',
        } as School)
        .subscribe();
      spectator.expectOne(baseUrl + 'api/v1/schools', HttpMethod.POST);
    });
  });

  describe('update', () => {
    it('should update school', () => {
      spectator.service
        .update('123', {
          id: '123',
          name: 'Schoolname',
          address: 'Street 1',
          postalCode: '1000AA',
          contactPersonName: 'Contactperson name',
          contactPersonEmail: 'email@email.nl',
        } as School)
        .subscribe();
      spectator.expectOne(baseUrl + 'api/v1/schools/123', HttpMethod.PUT);
    });
  });

  describe('delete', () => {
    it('should delete school', () => {
      spectator.service.delete('123').subscribe();
      spectator.expectOne(baseUrl + 'api/v1/schools/123', HttpMethod.DELETE);
    });
  });
});
