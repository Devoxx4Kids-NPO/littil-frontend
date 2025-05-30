import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { filter } from 'rxjs/operators';
import { PermissionController } from '../../services/permission.controller';
import { AvatarComponent } from '../avatar/avatar.component';
import { ButtonComponent } from '../button/button.component';
import { ModalController, ModalSize } from '../modal/modal.controller';
import {
  IRegisterModalOutput,
  RegisterModalComponent,
} from '../register-modal/register-modal.component';

@Component({
  selector: 'littil-user-menu',
  templateUrl: './user-menu.component.html',
  standalone: true,
  imports: [CommonModule, ButtonComponent, AvatarComponent, RouterModule],
})
export class UserMenuComponent implements OnInit {
  loaded: boolean = false;
  open: boolean = false;

  constructor(
    public readonly permissionController: PermissionController,
    private modalController: ModalController,
    public auth: AuthService,
    private router: Router
  ) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.open = false;
    });
  }

  ngOnInit(): void {
    this.auth.isLoading$.subscribe(loading => {
      this.loaded = !loading;
    });
  }

  get userAvatar(): string {
    return this.permissionController.activeAccount.picture || '';
  }

  public get loggedIn(): boolean {
    return !!this.permissionController.activeAccount;
  }

  public logOut(): void {
    this.auth.logout();
  }

  public async openRegisterModal() {
    return this.modalController
      .present(RegisterModalComponent, undefined, {
        modalSize: ModalSize.SM,
      })
      .then((response: IRegisterModalOutput) => {
        if (response.triggerLogin) {
          return this.openLoginModal();
        }
      });
  }

  public toggleMenu(): void {
    this.open = !this.open;
  }

  public openLoginModal(): void {
    this.auth.loginWithRedirect();
  }
}
