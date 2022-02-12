import {Component} from "@angular/core";
import {EventBus} from "./services/event-bus";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

@Component({
  //to indicate that html and css are relative to the component
  template: `
    <h3>Register as a teacher</h3>
    <form class="col-sm-3" [formGroup]="mainForm" class="main-ui-block">
      <div class="form-group">
        <label for="email">email</label>
        <input class="quiet" formControlName="email" id="email">
      </div>
      <div class="form-group">
        <label for="firstname">Voornaam</label>
        <input class="quiet" formControlName="email" id="email">
      </div>
      <div class="form-group">
        <label for="surname">Achternaam</label>
        <input class="quiet" formControlName="surname" id="surname">
      </div>
      <div class="form-group">
        <label for="surname">Postcode</label>
        <input class="quiet" formControlName="postalCode" id="postalCode">
        <button id="register-teacher" class="btn btn-secondary btn-sm" (click)="register()" >Register</button>
      </div>
    </form>
  `
})
export class RegisterTeacherComponent {

  mainForm: FormGroup;

  constructor(private eb: EventBus,
              private fb: FormBuilder) {
    let firstName = new FormControl('', Validators.required)
    let surname = new FormControl('', Validators.required)
    let email = new FormControl('', Validators.required)
    let postalCode = new FormControl('', Validators.required)
    this.mainForm = this.fb.group({
      firstName, surname, email, postalCode
    });

    firstName.valueChanges.pipe(debounceTime(1000)).subscribe(x => {
      console.log('first name ' + x);
    })
    surname.valueChanges.pipe(debounceTime(1000)).subscribe(x => {
      console.log('surname  '+ x);
    })
    email.valueChanges.pipe(debounceTime(1000)).subscribe(x => {
      console.log('surname  '+ x);
    })
    postalCode.valueChanges.pipe(debounceTime(1000)).subscribe(x => {
      console.log('surname  '+ x);
    })
  }



  register() {

  }

}
