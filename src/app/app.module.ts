import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { ApiModule, Configuration } from './api/generated';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from './components/button/button.module';
import { ContentContainerModule } from './components/content-container/content-container.module';
import { MainMenuButtonModule } from './components/main-menu-button/main-menu-button.module';
import { MainMenuDropdownButtonModule } from './components/main-menu-dropdown-button/main-menu-dropdown-button.module';
import { ModalControllerModule } from './components/modal/modal.controller.module';
import { RegisterModalModule } from './components/register-modal/register-modal.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ApiModule.forRoot(() => {
      return new Configuration({
        basePath: environment.serverUrl,
      });
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    ContentContainerModule,
    ButtonModule,
    RegisterModalModule,
    MainMenuButtonModule,
    MainMenuDropdownButtonModule,
    ModalControllerModule.forRoot(),
    AuthModule.forRoot({
      domain: environment.auth0Domain,
      clientId: environment.auth0ClientId,
      audience: environment.auth0Audience,
      httpInterceptor: {
        allowedList: [
          {
            uri: `${environment.serverUrl}/api/v1/users/user`,
            allowAnonymous: true,
          },
          {
            uri: `${environment.serverUrl}/api/*`,
          },
        ],
      },
    }),
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
