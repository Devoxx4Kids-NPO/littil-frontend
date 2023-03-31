import {Injectable} from '@angular/core';
import {DayOfWeek} from "../api/generated";

interface Day {
  description: string,
  value: string
}

@Injectable({providedIn: 'root'})
export class AvailabilityService {

  private static DaysOfTheWeek: Day[] = [
    {"value": DayOfWeek.Monday, "description": 'Maandag'},
    {"value": DayOfWeek.Tuesday, "description": 'Dinsdag'},
    {"value": DayOfWeek.Wednesday, "description": 'Woensdag'},
    {"value": DayOfWeek.Thursday, "description": 'Donderdag'},
    {"value": DayOfWeek.Friday, "description": 'Vrijdag'},
    {"value": DayOfWeek.Saturday, "description": 'Zaterdag'},
    {"value": DayOfWeek.Sunday, "description": 'Zondag'}
  ]

  static getByCode(code: string): string {
    const day = AvailabilityService.DaysOfTheWeek.find((day: Day) => {
      return day.value === code
    })
    if (day) {
      return day.description
    }
    throw Error('Ongeldige dag')
  }

  static getAll(): Day[] {
    return AvailabilityService.DaysOfTheWeek
  }

}
