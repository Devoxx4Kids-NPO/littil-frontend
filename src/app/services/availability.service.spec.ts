import {TestBed} from '@angular/core/testing';

import {AvailabilityService} from './availability.service';
import {DayOfWeek} from "../api/generated";

const DaysOfTheWeek: { [key: string]: string }[] = [
  {"value": DayOfWeek.Monday, "description": 'Maandag'},
  {"value": DayOfWeek.Tuesday, "description": 'Dinsdag'},
  {"value": DayOfWeek.Wednesday, "description": 'Woensdag'},
  {"value": DayOfWeek.Thursday, "description": 'Donderdag'},
  {"value": DayOfWeek.Friday, "description": 'Vrijdag'},
  {"value": DayOfWeek.Saturday, "description": 'Zaterdag'},
  {"value": DayOfWeek.Sunday, "description": 'Zondag'}
]

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
    expect(AvailabilityService.getAll()).toEqual(DaysOfTheWeek)
  });

  it('Should return the right value for the right code', () => {
    for (let day of DaysOfTheWeek) {
      expect(AvailabilityService.getByCode(day['value'])).toEqual(day['description'])
    }
  });

  it('Should throw an error on a non existing team', () => {

    expect(() =>
      AvailabilityService.getByCode('NONEDAY')
    ).toThrow(new Error('Ongeldige dag'))

  });
});
