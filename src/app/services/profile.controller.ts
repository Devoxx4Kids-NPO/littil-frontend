import { AuthService, User } from '@auth0/auth0-angular';
import { Observable, switchMap, tap } from 'rxjs';
import { GuestTeacher, School } from '../api/generated';
import { Component, Injectable } from '@angular/core';
import { PermissionController, Roles } from './permission.controller';
import { Coordinates, CoordinatesService } from './coordinates/coordinates.service';
import { LittilTeacherService } from './littil-teacher/littil-teacher.service';
import { LittilSchoolService } from './littil-school/littil-school.service';
import { OpenStreetMapService } from './coordinates/open-street-map.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileController {

  public constructor(
    private permissionController: PermissionController,
    private coordinatesService: OpenStreetMapService,
    private littilTeacherService: LittilTeacherService,
    private littilSchoolService: LittilSchoolService
  ) {}

  profile!: GuestTeacher | School;
  coordinates!: Coordinates;

  handleProfile(user: User, roleId: string, roleType: Roles): void {
    const profileObservable: Observable<GuestTeacher | School> = roleType == Roles.GuestTeacher ?
      this.littilTeacherService.getById(roleId) : this.littilSchoolService.getById(roleId);

    profileObservable.subscribe( profile => {
      this.profile = profile;
      this.coordinatesService.getCoordinates(user.address).subscribe(coordinates => {
        console.log("coordinates: " + JSON.stringify(coordinates));
        this.coordinates = coordinates;
      })

      console.log("Profile: " + JSON.stringify(profile));
    });
  }

}
