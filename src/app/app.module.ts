import { NgModule } from '@angular/core';
import { ApiModule } from './api/generated/api.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalControllerModule } from './components/modal/modal.controller.module';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ApiModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalControllerModule.forRoot(),
    AuthModule.forRoot({
      domain: 'dev-4vxqp7jo.eu.auth0.com',
      clientId: '6OUY2Q372wiqUc4rFdH5HbgiP4CMHHqz'
    }),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
