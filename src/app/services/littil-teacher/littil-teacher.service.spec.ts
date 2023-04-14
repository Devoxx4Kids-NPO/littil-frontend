import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { GuestTeacherPostResource, TeacherService } from '../../api/generated';
import { LittilTeacherService } from './littil-teacher.service';

describe('LittilTeacherService', () => {
  let baseUrl = 'http://localhost:8080';
  let spectator: SpectatorHttp<LittilTeacherService>;
  const createHttp = createHttpFactory({
    service: LittilTeacherService,
    imports: [HttpClientTestingModule],
    providers: [TeacherService],
  });

  beforeEach(() => {
    spectator = createHttp();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('getById', () => {
    it('should get teacher by id', () => {
      spectator.service.getById('123').subscribe();
      spectator.expectOne(
        baseUrl + '/api/v1/guest-teachers/123',
        HttpMethod.GET
      );
    });
  });

  describe('getAll', () => {
    it('should get all teachers', () => {
      spectator.service.getAll().subscribe();
      spectator.expectOne(baseUrl + '/api/v1/guest-teachers', HttpMethod.GET);
    });
  });

  describe('createOrUpdate', () => {
    it('should create or update teacher', () => {
      spectator.service
        .createOrUpdate({
          id: undefined,
          firstName: 'Gast',
          surname: 'Docent',
          address: 'Street 1',
          postalCode: '1000AA',
        } as GuestTeacherPostResource)
        .subscribe();
      spectator.expectOne(baseUrl + '/api/v1/guest-teachers', HttpMethod.PUT);
    });
  });

  describe('delete', () => {
    it('should delete teacher', () => {
      spectator.service.delete('123').subscribe();
      spectator.expectOne(
        baseUrl + '/api/v1/guest-teachers/123',
        HttpMethod.DELETE
      );
    });
  });

  describe('modules', () => {
    it('should get modules for teacher', () => {
      spectator.service.getModules('123').subscribe();
      spectator.expectOne(baseUrl + '/api/v1/guest-teachers/123/modules', HttpMethod.GET);
    });
    it('should add a module for a teacher', () => {
      spectator.service.addModule('123', {
        id: "test",
        name: "name"
      }).subscribe();
      spectator.expectOne(baseUrl + '/api/v1/guest-teachers/123/modules', HttpMethod.POST);
    });
    it('should delete a module for a teacher', () => {
      spectator.service.removeModule('123', '567').subscribe();
      spectator.expectOne(baseUrl + '/api/v1/guest-teachers/123/modules/567', HttpMethod.DELETE);
    });
  });
  // http://localhost:8080/api/v1/guest-teachers/123/modules/567
  // http://localhost:8080/api/v1/guest-teachers/567/modules/12
});
