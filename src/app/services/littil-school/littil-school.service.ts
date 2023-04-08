import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School, SchoolService } from '../../api/generated';

@Injectable({
  providedIn: 'root',
})
export class LittilSchoolService {
  constructor(private schoolService: SchoolService) {}

  getById(id: string): Observable<School> {
    return this.schoolService.apiV1SchoolsIdGet(id);
  }

  getAll(): Observable<School[]> {
    return this.schoolService.apiV1SchoolsGet();
  }
  getByName(name: string): Observable<School[]> {
    return this.schoolService.apiV1SchoolsNameNameGet(name);
  }

  createOrUpdate(school: School): Observable<School> {
    return this.schoolService.apiV1SchoolsPut(school);
  }

  delete(id: string): Observable<any> {
    return this.schoolService.apiV1SchoolsIdDelete(id);
  }
}
