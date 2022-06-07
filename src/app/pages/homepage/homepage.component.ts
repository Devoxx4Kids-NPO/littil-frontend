import { Component, Inject } from '@angular/core';
import { ModalController } from '../../components/modal/modal.controller';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'littil-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private modalController: ModalController // todo not known if should be used in future
  ) {}

  public openLoginModal() {
    this.auth.loginWithRedirect();
  }

  public logout() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}
