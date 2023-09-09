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
      {
        path: 'devoxx4kids',
        data: {
          menuText: 'Devvox4kids',
        },
        loadChildren: () =>
          import('./devoxx4kids/devoxx4kids.module').then((m) => m.Devoxx4kidsModule),
      },
      {
        path: 'contact',
        data: {
          menuText: 'Contact',
        },
        loadChildren: () =>
          import('./contact/contact.module').then((m) => m.ContactModule),
      },
      {
        path: 'privacy-policy',
        data: {
          menuText: 'Privacy Policy',
        },
        loadChildren: () =>
          import('./privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule),
      },
      {
        path: 'disclaimer',
        data: {
          menuText: 'Disclaimer',
        },
        loadChildren: () =>
          import('./disclaimer/disclaimer.module').then((m) => m.DisclaimerModule),
      },
    ],
  },
];
