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

@NgModule({
  declarations: [
    AppComponent, RegisterTeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,MatDialogModule, MatTabsModule
  ],
  providers: [EventBus],
  bootstrap: [AppComponent]
})
export class AppModule { }
