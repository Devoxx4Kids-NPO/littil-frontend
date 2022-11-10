import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, tap } from 'rxjs';
import { PermissionController } from './permission.controller';

@Injectable({
  providedIn: 'root',
})
export class CompleteProfileGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private permissionController: PermissionController
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean | UrlTree> | boolean {
    return this.authService.isAuthenticated$.pipe(
      tap((loggedIn) => {
        if (
          loggedIn &&
          !this.permissionController.hasAnyRole() &&
          state.url !== '/complete-profile'
        ) {
          return this.router.navigateByUrl('/complete-profile');
        } else {
          return true;
        }
      })
    );
  }
}
