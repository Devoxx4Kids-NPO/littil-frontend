import { Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { GuestTeacher, School } from '../api/generated';
import { Coordinates } from './coordinates/coordinates.service';
import { OpenStreetMapService } from './coordinates/open-street-map.service';
import { LittilSchoolService } from './littil-school/littil-school.service';
import { LittilTeacherService } from './littil-teacher/littil-teacher.service';
import { Roles } from './permission.controller';

@Injectable({
  providedIn: 'root',
})
export class ProfileController {
  public constructor(
    private coordinatesService: OpenStreetMapService,
    private littilTeacherService: LittilTeacherService,
    private littilSchoolService: LittilSchoolService
  ) {}

  profile!: GuestTeacher | School;
  coordinates!: Coordinates;

  handleProfile(user: User, roleId: string, roleType: Roles): void {
    // TODO: call this in permissionController OR authResolver
    const profileObservable: Observable<GuestTeacher | School> =
      roleType == Roles.GuestTeacher
        ? this.littilTeacherService.getById(roleId)
        : this.littilSchoolService.getById(roleId);

    profileObservable.subscribe((profile) => {
      this.profile = profile;
      this.coordinatesService
        .getCoordinates(user.address)
        .subscribe((coordinates) => {
          this.coordinates = coordinates;
        });
    });
  }
}
