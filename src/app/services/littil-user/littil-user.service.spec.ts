import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { environment } from '../../../environments/environment';
import { User, UsersService } from '../../api/generated';
import { LittilUserService } from './littil-user.service';

describe('LittilUserService', () => {
  let baseUrl = environment.serverUrl;
  let service: LittilUserService;
  let spectator: SpectatorHttp<LittilUserService>;
  const createHttp = createHttpFactory(LittilUserService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(LittilUserService);
    spectator = createHttp();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getById', () => {
    it('should get user by id', () => {
      spectator.service.getById('123').subscribe();
      spectator.expectOne(baseUrl + '/api/v1/users/user/123', HttpMethod.GET);
    });
  });

  describe('getAll', () => {
    it('should get all users', () => {
      spectator.service.getAll().subscribe();
      spectator.expectOne(baseUrl + '/api/v1/users/user', HttpMethod.GET);
    });
  });

  describe('create', () => {
    it('should create new teacher', () => {
      spectator.service
        .create({
          emailAddress: 'email@email.nl',
        } as User)
        .subscribe();
      spectator.expectOne(baseUrl + '/api/v1/users/user', HttpMethod.POST);
    });
  });

  describe('delete', () => {
    it('should delete user', () => {
      spectator.service.delete('123').subscribe();
      spectator.expectOne(
        baseUrl + '/api/v1/users/user/123',
        HttpMethod.DELETE
      );
    });
  });
});
