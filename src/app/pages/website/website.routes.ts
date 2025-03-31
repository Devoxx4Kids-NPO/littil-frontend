import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

export const websiteRoutes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    data: {
      menuText: 'Home',
    },
  },
  {
    path: 'about-us',
    data: {
      menuText: 'Over ons',
    },
    loadComponent: () => import('./about-us/about-us.component').then(m => m.AboutUsComponent),
  },
  {
    path: 'info',
    data: {
      menuText: 'Informatie',
    },
    loadChildren: () => import('./info/information.routes').then(m => m.routes),
  },
  {
    path: 'devoxx4kids',
    data: {
      menuText: 'Devvox4kids',
    },
    loadComponent: () =>
      import('./devoxx4kids/devoxx4kids.component').then(m => m.Devoxx4kidsComponent),
  },
  {
    path: 'modules',
    data: {
      menuText: 'Modules',
    },
    loadComponent: () => import('./modules/modules.component').then(m => m.ModulesComponent),
  },
  {
    path: 'blog',
    data: {
      menuText: 'blog',
    },
    loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent),
  },
  {
    path: 'contact',
    data: {
      menuText: 'Contact',
    },
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'privacy-policy',
    data: {
      menuText: 'Privacy Policy',
    },
    loadComponent: () =>
      import('./privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
  },
  {
    path: 'disclaimer',
    data: {
      menuText: 'Disclaimer',
    },
    loadComponent: () =>
      import('./disclaimer/disclaimer.component').then(m => m.DisclaimerComponent),
  },
];
