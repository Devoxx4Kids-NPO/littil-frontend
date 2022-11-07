import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable, tap } from 'rxjs';
import { PermissionController } from './permission.controller';

export enum Roles {
  Admin = 'Admin',
  School = 'School',
  GuestTeacher = 'GuestTeacher',
}

export const roleHierarchy = [Roles.Admin, Roles.School, Roles.GuestTeacher];

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  protected _userAccount!: User | null | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private permissionController: PermissionController
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean | UrlTree> | boolean {
    return this.authService.isAuthenticated$.pipe(
      tap((loggedIn) => {
        console.log('loggedin', loggedIn);
        if (!loggedIn) {
          return this.router.navigateByUrl('/home');
        }
        this.authService.user$.subscribe(
          (userProfile: User | null | undefined) => {
            if (userProfile) {
              console.log('user', userProfile);
              this.permissionController.activeAccount = userProfile;
            }
          }
        );
        this.authService.idTokenClaims$.subscribe((claims) => {
          console.log('claims', claims);
        });
        this.permissionController.setRoles([]);
        return true;
      })
    );
  }
}
