import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatorResolver } from './services/authentication.resolver';
import { CompleteProfileGuardService } from './services/complete-profile-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/website/website.routes').then(m => m.websiteRoutes),
    canActivate: [CompleteProfileGuardService],
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.routes').then(m => m.routes),
    canActivate: [CompleteProfileGuardService],
    resolve: { auth: AuthenticatorResolver },
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.routes').then(m => m.routes),
    canActivate: [CompleteProfileGuardService],
    resolve: {
      auth: AuthenticatorResolver,
    },
  },
  {
    path: 'complete-profile',
    loadChildren: () =>
      import('./pages/complete-profile/complete-profile.module').then(
        m => m.CompleteProfilePageModule
      ),
    canActivate: [CompleteProfileGuardService],
    resolve: {
      auth: AuthenticatorResolver,
    },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      enableTracing: true,
    }),
  ],
  exports: [RouterModule],
  providers: [CompleteProfileGuardService]
})
export class AppRoutingModule {}
