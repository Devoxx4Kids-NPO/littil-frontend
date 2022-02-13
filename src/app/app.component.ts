import {Component, OnInit} from '@angular/core';
import {EventBus} from "./services/event-bus";

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>Welcome to LITTIL</h1>
      <a routerLink="register-teacher" routerLinkActive="active">Register teacher</a>
      <router-outlet></router-outlet>
    </div>

  `
})
export class AppComponent implements OnInit {
  title = 'Welcome to LITTIL'

  constructor(private eventBus: EventBus) {
    eventBus.on("production", (prod) => {

    })
  }

  ngOnInit(): void {

  }

}
