import {
  ModalController,
  ModalSize,
} from '../modal/modal.controller';
import {Component, OnInit} from '@angular/core';
import {PermissionController} from '../../services/permission.controller';
import {AuthService} from '@auth0/auth0-angular';
import {RegisterModalComponent} from "../register-modal/register-modal.component";

@Component({
  selector: 'littil-user-menu',
  templateUrl: './user-menu.component.html',
})
export class UserMenuComponent implements OnInit {
  loaded: boolean = false;
  open: boolean = false

  constructor(
    public readonly permissionController: PermissionController,
    private modalController: ModalController,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.auth.isLoading$.subscribe((loading) => {
      this.loaded = !loading
    });
  }

  public get loggedIn(): boolean {
    return !!this.permissionController.activeAccount;
  }

  public logOut(): void {
    this.auth.logout();
  }

  public openRegisterModal() {
    return this.modalController.present(RegisterModalComponent, undefined, {
      modalSize: ModalSize.SM,
    });
  }

  public toggleMenu(): void {
    this.open = !this.open;
  }

  public openLoginModal(): void {
    this.auth.loginWithRedirect();
  }
}
