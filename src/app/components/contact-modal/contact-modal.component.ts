import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { firstValueFrom, Observable } from 'rxjs';
import {
  ApiV1ContactsGet200Response,
  ContactPostResource,
  SearchResult,
} from '../../api/generated';
import { LittilContactService } from '../../services/littil-contact/littil-contact.service';
import { FormUtil } from '../../utils/form.util';
import { ButtonComponent } from '../button/button.component';
import { FormErrorMessageComponent } from '../forms/form-error-message/form-error-message.component';
import { FormInputTextComponent } from '../forms/text-input/form-input-text.component';
import { IModalComponent } from '../modal/modal.controller';
import { activeAccountNameSignal } from "../../state/active-account-name.signal";

@Component({
  selector: 'littil-register-modal',
  templateUrl: 'contact-modal.component.html',
  styles:[`
    div {padding: 20px}`],
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
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    FormInputTextComponent,
    FormErrorMessageComponent,
  ],
})
export class ContactModalComponent implements IModalComponent<undefined, SearchResult> {
  close!: () => void;
  public loading = false;
  public hideForm = false;
  public hideConfirmation = true;
  FormUtil = FormUtil;
  private searchResult: SearchResult = {} as SearchResult;

  contactForm: FormGroup = new FormGroup({
    contactInfo: new FormControl(activeAccountNameSignal(), [
      Validators.required,
    ]),
    message: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly contactService: LittilContactService,
  ) {}

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
      const contactPostResource: ContactPostResource = Object.assign(formValues);
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
