import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable, tap } from 'rxjs';
import { PermissionController } from './permission.controller';

@Injectable({ providedIn: 'root' })
export class AuthenticatorResolver implements Resolve<any> {
  public constructor(
    private authService: AuthService,
    private permissionController: PermissionController
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
