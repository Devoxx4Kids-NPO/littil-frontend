import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {
  ModalController,
  ModalSize,
} from '../../components/modal/modal.controller';
import { RegisterModalComponent } from '../../components/register-modal/register-modal.component';
import { menuRoutes } from './menu.routes';

@Component({
  selector: 'littil-website',
  templateUrl: './website.component.html',
})
export class WebsiteComponent implements OnInit {
  public menuRoutes = menuRoutes;

  public get loggedIn(): boolean {
    return false;
  }

  constructor(
    private modalController: ModalController,
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document
  ) {}

  public ngOnInit(): void {
    console.log('auth:', this.auth);
  }

  public openRegisterModal() {
    return this.modalController.present(RegisterModalComponent, undefined, {
      modalSize: ModalSize.SM,
    });
  }

  public openLoginModal() {
    console.log('Not implemented yet: redirect to auth0 login form');
  }
}
