import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'littil-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    role: new FormControl(''),
    message: new FormControl(''),
  });

  postForm(): void {
    if (this.contactForm.valid) {
      console.log(this.contactForm)
    } else {
      //TODO:: Error handling
    }
  }
}
