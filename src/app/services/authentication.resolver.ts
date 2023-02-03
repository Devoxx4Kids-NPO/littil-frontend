import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable, tap } from 'rxjs';
import { PermissionController } from './permission.controller';
import { ProfileController } from './profile.controller';

@Injectable({ providedIn: 'root' })
export class AuthenticatorResolver implements Resolve<any> {
  public constructor(
    private authService: AuthService,
    private permissionController: PermissionController,
    private profileController: ProfileController
  ) {}

  public resolve(): Observable<any> {
    return this.authService.isAuthenticated$.pipe(
      tap((loggedIn) => {
        this.permissionController.loggedIn = loggedIn;
        if (!loggedIn) {
          return;
        }
        this.authService.user$.subscribe(
          (userProfile: User | null | undefined) => {
            if (userProfile) {
              this.permissionController.handleNewUser(userProfile);
              this.profileController.handleProfile(
                userProfile,
                this.permissionController.getRoleId(),
                this.permissionController.getRoleType())
              ;
            }
          }
        );
        return true;
      })
    );
  }
}
