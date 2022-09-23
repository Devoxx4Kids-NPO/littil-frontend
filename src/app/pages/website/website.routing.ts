import { Routes } from '@angular/router';
import { WebsiteComponent } from './website.component';

export const websiteRoutes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        data: {
          menuText: 'Home',
        },
        loadChildren: () =>
          import('./homepage/homepage.module').then((m) => m.HomePageModule),
      },
      {
        path: 'about-us',
        data: {
          menuText: 'Over ons',
        },
        loadChildren: () =>
          import('./about-us/about-us.module').then((m) => m.AboutUsModule),
      },
      {
        path: 'info',
        data: {
          menuText: 'Informatie',
        },
        loadChildren: () =>
          import('./info/information.module').then((m) => m.InformationModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
