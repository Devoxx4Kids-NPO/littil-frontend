import { TestBed } from '@angular/core/testing';

import { LittilModulesService } from './littil-modules.service';
import {createHttpFactory, HttpMethod, SpectatorHttp} from "@ngneat/spectator";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ModuleService} from "../../api/generated";

describe('LittilModulesService', () => {
  let service: LittilModulesService;
  let baseUrl = 'http://localhost:8080';
  let spectator: SpectatorHttp<LittilModulesService>;
  const createHttp = createHttpFactory(LittilModulesService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModuleService],
    });
    service = TestBed.inject(LittilModulesService);
    spectator = createHttp();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should get all modules', () => {
      spectator.service.getAll().subscribe();
      spectator.expectOne(baseUrl + '/api/v1/modules', HttpMethod.GET);
    });
  });

});
