import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {
  ModalController,
  ModalSize,
} from './components/modal/modal.controller';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { IMenuItem, menuRoutes, MenuType } from './pages/menu.routes';
import { PermissionController } from './services/permission.controller';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public menuRoutes: IMenuItem[] = menuRoutes;

  public get loggedIn(): boolean {
    return !!this.permissionController.activeAccount;
  }

  constructor(
    private modalController: ModalController,
    public auth: AuthService,
    public readonly permissionController: PermissionController,
    @Inject(DOCUMENT) public document: Document
  ) {}

  public ngOnInit(): void {
    this.permissionController.onPermissionChange.subscribe(() => {
      const adminPages: IMenuItem[] = menuRoutes.filter(
        (route) => route.type === MenuType.Admin
      );
      adminPages.forEach((item: IMenuItem) => {
        item.disabled = !this.permissionController.loggedIn;
      });
    });
  }

  public openRegisterModal() {
    return this.modalController.present(RegisterModalComponent, undefined, {
      modalSize: ModalSize.SM,
    });
  }

  public openLoginModal() {
    this.auth.loginWithRedirect();
  }

  public logOut() {
    this.auth.logout();
  }
}
