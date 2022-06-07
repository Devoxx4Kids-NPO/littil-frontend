import {Component, Inject, Injectable} from '@angular/core';
import { ModalController } from '../../components/modal/modal.controller';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'littil-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent {
  constructor(
    public auth: AuthService,
    private http: HttpClient,
    @Inject(DOCUMENT) private doc: Document,
    private modalController: ModalController // todo not known if should be used in future
  ) {}

  public openLoginModal() {
    this.auth.loginWithRedirect();
  }

  public logout() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

  public call (){
    // todo to test set your own uri
    // todo when merging this should be gone
    this.http.get("https://webhook.site/57e26b5e-72d6-42f5-80c5-137c59a50374").subscribe()
  }
}
