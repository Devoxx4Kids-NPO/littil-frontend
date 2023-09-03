import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'littil-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {

  privacyPolicyForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    role: new FormControl(''),
    message: new FormControl(''),
  });

  postForm(): void {
    if (this.privacyPolicyForm.valid) {
      console.log(this.privacyPolicyForm)
    } else {
      //TODO:: Error handling
    }
  }
}
