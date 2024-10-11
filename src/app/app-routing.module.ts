import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatorResolver } from './services/authentication.resolver';
import { CompleteProfileGuardService } from './services/complete-profile-guard.service';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    canActivate: [CompleteProfileGuardService],
    resolve: {
      auth: AuthenticatorResolver,
    },
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
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
    path: '',
    loadChildren: () => import('./pages/website/website.routes').then(m => m.websiteRoutes),
    resolve: { auth: AuthenticatorResolver },
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      enableTracing: false, // debugging purpose
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
