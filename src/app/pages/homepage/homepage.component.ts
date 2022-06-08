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
  private response:Object = "";
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
    // todo to test deploy backend
    // todo when merging this should be gone
    this.http.get("http://localhost:8080/api/v1/school").subscribe(resp => {
      this.response = resp
      console.log(resp)
    })
  }
}
