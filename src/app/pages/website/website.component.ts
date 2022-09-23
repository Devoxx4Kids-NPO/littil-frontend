import { Component } from '@angular/core';
import {
  ModalController,
  ModalSize,
} from '../../components/modal/modal.controller';
import { RegisterModalComponent } from '../../components/register-modal/register-modal.component';

@Component({
  selector: 'littil-website',
  templateUrl: './website.component.html',
})
export class WebsiteComponent {
  public menuRoutes = [
    {
      path: '/home',
      menuText: 'Home',
    },
    {
      path: '/about-us',
      menuText: 'Over ons',
    },
    {
      path: '/info',
      menuText: 'Informatie',
      subRoutes: [
        {
          path: '/info/schools',
          menuText: 'Scholen',
        },
        {
          path: '/info/it-specialists',
          menuText: 'IT Specialisten',
        },
        {
          path: '/info/sponsors',
          menuText: 'Sponsors',
        },
      ],
    },
    {
      path: '/blog',
      menuText: 'Blog',
    },
    {
      path: '/contact',
      menuText: 'Contact',
    },
    {
      path: '/devoxx4kids',
      menuText: 'Devoxx4Kids',
    },
  ];

  constructor(private modalController: ModalController) {}

  public openRegisterModal() {
    return this.modalController.present(RegisterModalComponent, undefined, {
      modalSize: ModalSize.SM,
    });
  }

  public openLoginModal() {
    console.log('Not implemented yet: redirect to oauth0 login form');
  }
}
