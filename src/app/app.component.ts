import {Component, OnInit} from '@angular/core';
import {EventBus} from "./services/event-bus";

@Component({
  selector: 'app-root',
  styleUrls: ['../../node_modules/angular2-toaster/toaster.css'],
  template: `
    <div>
      <h1>Welcome to LITTIL</h1>
      <a routerLink="register-teacher" routerLinkActive="active">Register teacher</a>
      <toaster-container></toaster-container>
      <router-outlet></router-outlet>
    </div>

  `
})
export class AppComponent implements OnInit {
  title = 'Welcome to LITTIL'

  constructor(private eventBus: EventBus) {

  }

  ngOnInit(): void {

  }

}
