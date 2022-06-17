import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalControllerModule } from './components/modal/modal.controller.module';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { environment } from "../environments/environment";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalControllerModule.forRoot(),
    AuthModule.forRoot({
      domain: environment.AUTH_DOMAIN,
      clientId: environment.AUTH_CLIENT_ID,
      audience: environment.AUTH_AUDIENCE,

      // Specify configuration for the interceptor
      httpInterceptor: {
        allowedList: [
          {
            // matched urls which the token should be added to
            uri: '*',
            tokenOptions: {
              // The attached token should target this audience
              audience: environment.AUTH_AUDIENCE,
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
