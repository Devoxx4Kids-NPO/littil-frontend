import {Component, Inject} from '@angular/core';
import {ModalController} from '../../components/modal/modal.controller';
import {LoginModalComponent, LoginType,} from '../login-modal/login-modal.component';
import {AuthService} from "@auth0/auth0-angular";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'littil-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent {
  LoginType = LoginType;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private modalController: ModalController
  ) {}

  public openLoginModal(type: LoginType) {
    if (type == LoginType.Login) {
      this.auth.loginWithRedirect();
      return this
    } else {
      return this.modalController.present(LoginModalComponent, {type:   type});
    }
  }

  public logout() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}
