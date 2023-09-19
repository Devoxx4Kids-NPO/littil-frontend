import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AdminComponent } from './admin.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then((m) => m.SearchModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule)
      },
      {
        path: 'modules',
        loadChildren: () => import('./modules/modules.module').then((m) => m.ModulesModule)
      }
    ],
  },
];
