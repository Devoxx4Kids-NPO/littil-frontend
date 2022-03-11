import {Toast, ToasterService} from "angular2-toaster";
import {Injectable} from "@angular/core";
import {EventBus} from "./event-bus";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class RestClient {

  constructor(private httpClient: HttpClient,
              private eventBus: EventBus,
              private toasterService: ToasterService) {
  }

  doGet<T>(path: string): Observable<HttpResponse<T>> {
    return this.httpClient.get(path, this.createJsonHeader()) as Observable<HttpResponse<T>>
  }

  doPut<T>(body: any, path: string): Observable<HttpResponse<T>> {
    return this.httpClient.put<HttpResponse<T>>(path, body, this.createJsonHeader())
  }

  doPost<T>(body: any, path: string): Observable<HttpResponse<T>> {
    return this.httpClient.post<HttpResponse<T>>(path, body, this.createJsonHeader())
  }

  doDelete<T>(id: number, path: string): Observable<HttpResponse<T>> {
    return this.httpClient.delete<HttpResponse<T>>(path + '/' + id, this.createJsonHeader())
  }

  createJsonHeader() {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json')
    return {headers: headers}
  }

  toastInfo(message: string) {
    let toast: Toast = {
      type: 'info',
      title: message,
      body: ''
    };
    this.toasterService.pop(toast)
  }

  toastError(error: Response, text: string) {
    console.error(JSON.stringify(error))
    let toast: Toast = {
      type: 'error',
      title: error.statusText,
      body: text
    };
    this.toasterService.pop(toast)
  }


}
