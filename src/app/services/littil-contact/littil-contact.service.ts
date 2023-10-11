import {
  ApiV1ContactsGet200Response,
  ContactPostResource,
  ContactService,
} from '../../api/generated';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LittilContactService {

  constructor(private contactService: ContactService) {}

  sendEmail(contactPostResource :ContactPostResource): Observable<ApiV1ContactsGet200Response> {
    return this.contactService.apiV1ContactsPost(contactPostResource);
  }
}
