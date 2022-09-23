import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { ApiModule } from './api/generated';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ContentContainerModule } from "./components/content-container/content-container.module";
import { ModalControllerModule } from './components/modal/modal.controller.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ApiModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    ContentContainerModule,
    ModalControllerModule.forRoot(),
    AuthModule.forRoot({
      domain: environment.auth0Domain,
      clientId: environment.auth0ClientId
    }),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}
