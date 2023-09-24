import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';
import { getLittilConfigFromWindow } from '../littilConfig';
import { ApiModule, Configuration } from './api/generated';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from './components/button/button.module';
import { ContentContainerModule } from './components/content-container/content-container.module';
import { ErrorModalModule } from './components/error-modal/error-modal.module';
import { MainMenuButtonModule } from './components/main-menu-button/main-menu-button.module';
import { MainMenuDropdownButtonModule } from './components/main-menu-dropdown-button/main-menu-dropdown-button.module';
import { ModalControllerModule } from './components/modal/modal.controller.module';
import { RegisterModalModule } from './components/register-modal/register-modal.module';
import { UserMenuModule } from './components/user-menu/user-menu.module';
import { interceptorProviders } from './interceptors/http-interceptors';
import { environment } from "../environments/environment";
import {ContactModalModule} from "./components/contact-modal/contact-modal.module";
import {NgcCookieConsentConfig, NgcCookieConsentModule} from "ngx-cookieconsent";

const littilConfig = getLittilConfigFromWindow();

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: environment.cookieDomain
    // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'info',
  elements:{
    messagelink: `
      <span id="cookieconsent:desc" class="cc-message">{{message}}
        <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{privacyPolicyHref}}"
           target="_self">{{privacyPolicyLink}}</a>,
        </span>
      `},
    content: {
      message: "Deze website gebruikt cookies. Meer hierover kun je lezen in onze ",
      dismiss: "akkoord",
      target: "_self",
      privacyPolicyLink: 'privacy policy',
      privacyPolicyHref: '#/privacy-policy',
    },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgcCookieConsentModule.forRoot(cookieConfig),
    ApiModule.forRoot(() => {
      return new Configuration({
        basePath: littilConfig.apiHost,
      });
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    ContentContainerModule,
    ButtonModule,
    UserMenuModule,
    ContactModalModule,
    RegisterModalModule,
    ErrorModalModule,
    MainMenuButtonModule,
    MainMenuDropdownButtonModule,
    ModalControllerModule.forRoot(),
    AuthModule.forRoot({
      domain: littilConfig.auth0Domain,
      clientId: littilConfig.auth0ClientId,
      audience: littilConfig.auth0Audience,
      httpInterceptor: {
        allowedList: [
          {
            uri: `${littilConfig.apiHost}/api/v1/users/user`,
            allowAnonymous: true,
          },
          {
            uri: `${littilConfig.apiHost}/api/*`,
          },
        ],
      },
      cacheLocation: environment.production ? undefined :  'localstorage',
    }),
  ],
  providers: [HttpClient, interceptorProviders],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
