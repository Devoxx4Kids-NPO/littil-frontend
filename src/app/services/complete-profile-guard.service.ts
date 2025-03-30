import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, map, tap, switchMap } from 'rxjs';
import { PermissionController } from './permission.controller';

@Injectable({
  providedIn: 'root',
})
export class CompleteProfileGuardService  {
  constructor(
    private router: Router,
    private authService: AuthService,
    private permissionController: PermissionController
  ) {
    console.log('CompleteProfileGuardService constructed', new Date().toISOString());
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    console.log('Guard canActivate called', { url: state.url, timestamp: new Date().toISOString() });

    // Add logging specifically for the auth observable
    this.authService.isAuthenticated$.subscribe(authStatus => {
        console.log('%%%% Guard: isAuthenticated$ emitted:', authStatus, { url: state.url, timestamp: new Date().toISOString() });
    });

    return this.authService.isAuthenticated$.pipe(
      tap(loggedIn => console.log('Auth state in guard (tap):', { loggedIn, url: state.url, timestamp: new Date().toISOString() })),
      map((loggedIn) => {
        console.log('Auth state in guard (map):', { loggedIn, url: state.url });
        // Allow homepage access when not logged in
        if (!loggedIn && state.url === '/') {
          console.log('Guard: Allowing homepage access (not logged in)');
          return true;
        }

        // Redirect to complete profile only when logged in without role
        if (loggedIn && !this.permissionController.hasAnyRole() &&
            state.url !== '/complete-profile') {
          console.log('Guard: Redirecting to /complete-profile');
          return this.router.parseUrl('/complete-profile');
        }

        console.log('Guard: Allowing access');
        return true;
      })
    );
  }
}
