import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  ErrorModalComponent,
  IErrorModalInput,
} from '../components/error-modal/error-modal.component';
import {
  ModalController,
  ModalSize,
} from '../components/modal/modal.controller';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private modalController: ModalController) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        null,
        (error) => {
          if (error instanceof HttpErrorResponse) {
            this.modalController.present(
              ErrorModalComponent,
              {
                errorMessage: error.message,
                errorStatus: error.status,
              } as IErrorModalInput,
              { modalSize: ModalSize.SM }
            );
          }
          return error;
        },
        null
      )
    );
  }
}
