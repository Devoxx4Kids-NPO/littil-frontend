import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroupDirective, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'littil-form-error-message',
  templateUrl: './form-error-message.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FormErrorMessageComponent implements OnInit {
  private readonly subscriptions = new Subscription();
  private readonly formGroupDirective = inject(FormGroupDirective);
  private readonly errors: {
    [key: string]: any;
  } = {
    required: () => 'Dit veld is verplicht',
    email: () => 'Vul een geldig emailadres in',
  };
  readonly messages$ = new BehaviorSubject<string[]>([]);

  @Input() controlName: string;
  @Input() customErrors?: ValidationErrors;

  public ngOnInit(): void {
    if (this.formGroupDirective) {
      const control = this.formGroupDirective.control.get(this.controlName);

      if (control) {
        this.subscriptions.add(
          control.valueChanges.subscribe(() => {
            const controlErrors = control.errors;
            console.log(controlErrors);

            if (controlErrors) {
              const keys = Object.keys(controlErrors);
              let errors: string[] = [];
              keys.forEach(key => {
                const getErrorForKey = this.errors[key];
                const text = this.customErrors?.[key] || getErrorForKey(controlErrors[key]);

                errors.push(text);
              });
              this.messages$.next(errors);
            } else {
              this.messages$.next([]);
            }
          })
        );
      }
    }
  }
}
