import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
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

const littilConfig = getLittilConfigFromWindow();

@NgModule({
  declarations: [AppComponent],
  imports: [
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
      cacheLocation: environment.production ? undefined : 'localstorage',
    }),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [HttpClient, interceptorProviders],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
