import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoordinatesService } from './coordinates.service';

// TODO: add unit tests
describe.skip('CoordinatesService', () => {
  let service: CoordinatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoordinatesService],
    });
    service = TestBed.inject(CoordinatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
