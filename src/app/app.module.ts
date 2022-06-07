import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalControllerModule } from './components/modal/modal.controller.module';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalControllerModule.forRoot(),
    AuthModule.forRoot({
      // TODO make configurable to allow more environments
      domain: 'dev-g60bne29.eu.auth0.com',
      clientId: '1MWGJlOHqjqNHiPZKEY5R4C7fsQySr9k'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
