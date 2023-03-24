import {Injectable} from '@angular/core';

interface Day {
  description: string,
  value: string
}

@Injectable({providedIn: 'root'})
export class AvailabilityService {

  private static DaysOfTheWeek: Day[] = [
    {value: 'MONDAY', description: 'Maandag'},
    {value: 'TUESDAY', description: 'Dinsdag'},
    {value: 'WEDNESDAY', description: 'Woensdag'},
    {value: 'THURSDAY', description: 'Donderdag'},
    {value: 'FRIDAY', description: 'Vrijdag'},
    {value: 'SATURDAY', description: 'Zaterdag'},
    {value: 'SUNDAY', description: 'Zondag'}
  ]

  getByCode(code: string): string {
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
