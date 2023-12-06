import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {firstValueFrom, Observable} from 'rxjs';
import {
  ApiV1ContactsGet200Response,
  ContactPostResource,
  SearchResult
} from '../../api/generated';
import { FormUtil } from '../../utils/form.util';
import { IModalComponent } from '../modal/modal.controller';
import {LittilContactService} from "../../services/littil-contact/littil-contact.service";

@Component({
  selector: 'littil-register-modal',
  templateUrl: 'contact-modal.component.html',
  animations: [
    trigger('hideShow', [
      state(
        'hidden',
        style({
          opacity: 0,
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
        })
      ),
      transition('hidden => visible', [animate('200ms')]),
    ]),
  ],
})
export class ContactModalComponent
  implements IModalComponent<undefined, SearchResult>
{
  close!: () => void;
  public loading = false;
  public hideForm = false;
  public hideConfirmation = true;
  FormUtil = FormUtil;
  private searchResult: SearchResult = { } as SearchResult;

  contactForm: FormGroup = new FormGroup({
    contactInfo: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  constructor(private readonly contactService: LittilContactService) {}

  public onOpen(searchResult: SearchResult) {
    this.searchResult = searchResult;
  }

  public async onClickSendEmail(): Promise<boolean> {
    return Promise.resolve().then(() => {
      FormUtil.ValidateAll(this.contactForm);
      if (this.contactForm.invalid) {
        return false;
      }

      let sendEmailCall: Observable<ApiV1ContactsGet200Response>;
      const formValues = {
        recipient: this.searchResult.userId,
        medium: this.contactForm.controls['contactInfo'].value,
        message: this.contactForm.controls['message'].value,
      };
      const contactPostResource: ContactPostResource = Object.assign(formValues)
      sendEmailCall = this.contactService.sendEmail(contactPostResource);

      return firstValueFrom(sendEmailCall)
        .then(() => {
          this.hideForm = true;
          this.hideConfirmation = false;
          return true;
        })
        .catch((error: any) => {
          console.error('save contact information/send email error');
          return false;
        });
      });
  }

}
