import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '@auth0/auth0-angular';
import {map, Observable} from 'rxjs';
import {PermissionController} from './permission.controller';

@Injectable({
  providedIn: 'root',
})
export class CompleteProfileGuardService {
  constructor(
    private router: Router,
    private authService: AuthService,
    private permissionController: PermissionController
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {

    return this.authService.isAuthenticated$.pipe(
      map((loggedIn) => {
        // Allow homepage access when not logged in
        if (!loggedIn && state.url === '/') {
          return true;
        }

        // Redirect to complete profile only when logged in without role
        if (loggedIn && !this.permissionController.hasAnyRole() &&
          state.url !== '/complete-profile') {
          return this.router.parseUrl('/complete-profile');
        }

        return true;
      })
    );
  }
}
