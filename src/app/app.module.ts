import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAuth0 } from '@auth0/auth0-angular';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import { environment } from '../environments/environment';
import { getLittilConfigFromWindow } from '../littilConfig';
import { ApiModule, Configuration } from './api/generated';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';
import { ContentContainerComponent } from './components/content-container/content-container.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { MainMenuButtonComponent } from './components/main-menu-button/main-menu-button.component';
import { MainMenuDropdownButtonComponent } from './components/main-menu-dropdown-button/main-menu-dropdown-button.component';
import { ModalControllerModule } from './components/modal/modal.controller.module';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { FeedbackFinProvider } from './feedback/feedbackfin.provider';
import { interceptorProviders } from './interceptors/http-interceptors';

const littilConfig = getLittilConfigFromWindow();

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.cookieDomain,
    // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000',
    },
    button: {
      background: '#f1d600',
    },
  },
  theme: 'edgeless',
  type: 'info',
  elements: {
    messagelink: `
      <span id="cookieconsent:desc" class="cc-message">{{message}}
        <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{privacyPolicyHref}}"
            target="_self">{{privacyPolicyLink}}</a>,
        </span>
      `,
  },
  content: {
    message: 'Deze website gebruikt cookies. Meer hierover kun je lezen in onze ',
    dismiss: 'akkoord',
    target: '_self',
    privacyPolicyLink: 'privacy policy',
    privacyPolicyHref: '/privacy-policy',
  },
};

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: [],
  imports: [
    NgcCookieConsentModule.forRoot(cookieConfig),
    ApiModule.forRoot(() => {
      return new Configuration({
        basePath: littilConfig.apiHost,
      });
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    ContentContainerComponent,
    ButtonComponent,
    UserMenuComponent,
    ContactModalComponent,
    RegisterModalComponent,
    ErrorModalComponent,
    MainMenuButtonComponent,
    MainMenuDropdownButtonComponent,
    ModalControllerModule.forRoot(),
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [
    HttpClient,
    interceptorProviders,
    FeedbackFinProvider,
    provideAuth0({
      domain: littilConfig.auth0Domain,
      clientId: littilConfig.auth0ClientId,
      authorizationParams: {
        audience: littilConfig.auth0Audience,
        redirect_uri: window.location.origin,
      },
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
      cacheLocation: environment.production ? undefined : 'localstorage',
    }),
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
