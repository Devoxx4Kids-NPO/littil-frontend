import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTabsModule} from "@angular/material/tabs";
import {EventBus} from "./services/event-bus";
import {RegisterTeacherComponent} from "./register-teacher.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TeacherService} from "./services/teacher-service";
import {RestClient} from "./services/rest-client";
import {ToasterModule} from "angular2-toaster";
@NgModule({
  declarations: [
    AppComponent, RegisterTeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,MatDialogModule, MatTabsModule, ToasterModule
  ],
  providers: [EventBus, TeacherService, RestClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
