import { TestBed } from '@angular/core/testing';

import { AvailabilityService } from './availability.service';

const DaysOfTheWeek: {[key: string]: string} = {
  'MONDAY': 'Maandag',
  'TUESDAY': 'Dinsdag',
  'WEDNESDAY': 'Woensdag',
  'THURSDAY': 'Donderdag',
  'FRIDAY': 'Vrijdag',
  'SATURDAY': 'Zaterdag',
  'SUNDAY': 'Zondag'
}

describe('AvailabilityService', () => {
  let service: AvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should have the mapping with all values', () => {
    expect(service.getAll()).toEqual(DaysOfTheWeek)
  });

  it('Should return the right value for the right code', () => {
      for (const [code, value] of Object.entries(DaysOfTheWeek)) {
        expect(service.getByCode(code)).toEqual(value)
      }
  });

  it('Should throw an error on a non existing team', () => {
      expect(() => service.getByCode('NONEDAY')).toThrow(new Error('Ongeldige dag'))

  });
});
