import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'littil-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document
  ) {}

  ngOnInit(): void {
    console.log(this.auth);
  }

  openRegisterDialog(): void {}
}
