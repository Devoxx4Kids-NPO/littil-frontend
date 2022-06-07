import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalControllerModule } from './components/modal/modal.controller.module';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';

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
      clientId: '1MWGJlOHqjqNHiPZKEY5R4C7fsQySr9k',
      // todo set proper audience uri
      audience: 'https://dev-g60bne29.eu.auth0.com/api/v2/',

      // Specify configuration for the interceptor
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://dev-g60bne29.eu.auth0.com/api/v2/' (note the asterisk)
            // todo set proper uri
            uri: 'https://webhook.site/*',
            tokenOptions: {
              // The attached token should target this audience
              // todo set proper audience uri
              audience: 'https://dev-g60bne29.eu.auth0.com/api/v2/',
            }
          }
        ]
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
