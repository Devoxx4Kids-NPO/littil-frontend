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
  templateUrl: './user-menu.component.html'
})
export class UserMenuComponent implements OnInit {
  constructor(
    public readonly permissionController: PermissionController,
    private modalController: ModalController,
    public auth: AuthService,
  ) {
  }

  ngOnInit(): void {
    // console.log(this.profile.handleProfile())
    // this.userService.getById(this.permissionController.userId).subscribe(user => {
    //   console.log(user)
    // });
  }

  public get loggedIn(): boolean {
    return !!this.permissionController.activeAccount;
  }

  public logOut() {
    this.auth.logout();
  }

  public openRegisterModal() {
    return this.modalController.present(RegisterModalComponent, undefined, {
      modalSize: ModalSize.SM,
    });
  }

  public openLoginModal() {
    this.auth.loginWithRedirect();
  }

  get avatarInitials(): string {
    //TODO: replace with actual name once the user data is being fetched by the auth service
    const nameComponents: string[] | undefined = this.permissionController.activeAccount.name?.split("@")
    let name: string = ''

    if (!Array.isArray(nameComponents)) {
      return 'L'
    }

    for (let s of nameComponents) {
      name = `${name}${s.split('')[0]}`
    }

    return name.toUpperCase()

  }
}
