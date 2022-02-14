import {Component} from "@angular/core";
import {EventBus} from "./services/event-bus";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

@Component({
  //to indicate that html and css are relative to the component
  template: `
    <h3>Register as a teacher</h3>
    <form class="col-lg-3" [formGroup]="mainForm">

      <div class="form-group row mt-3">
        <label for="email" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input class="form-control" formControlName="email" id="email">
          <small id="emailHelp" class="form-text text-muted">Je email-adres is niet zichtbaar voor andere docenten of scholen.</small>
          <div *ngIf="getControl['email'].touched && getControl['email'].invalid" class="text-danger">
            <div>Dit is geen geldig email adres.</div>
          </div>
        </div>
      </div>

      <div class="form-group row mt-3">
        <label for="email" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
          <input class="form-control" type="password" formControlName="password" id="password">
          <input class="form-control" type="password" formControlName="password_repeat" id="password_repeat"
                 placeholder="herhaal wachtwoord">
          <small id="emailHelp" class="form-text text-muted">Je wachtwoord moet minimaal 8 tekens lang zijn.</small>
          <div *ngIf="getControl['password'].touched && getControl['password_repeat'].touched && (getControl['password'].invalid || getControl['password_repeat'].invalid)" class="text-danger">
            <div>Wachtwoorden moet minimaal 8 tekens lang zijn</div>
          </div>
          <div *ngIf="getControl['password'].touched && getControl['password_repeat'].touched && (getControl['password'].value != getControl['password_repeat'].value)" class="text-danger">
            <div>Wachtwoorden mogen niet verschillen</div>
          </div>
        </div>
      </div>

      <div class="form-group row mt-3">
        <label for="firstName" class="col-sm-2 col-form-label">Voornaam</label>
        <div class="col-sm-10">
          <input class="form-control" formControlName="email" id="email">
        </div>
      </div>

      <div class="form-group row mt-3">
        <label for="surname" class="col-sm-2 col-form-label">Achternaam</label>
        <div class="col-sm-10">
          <input class="form-control" formControlName="surname" id="surname">
          <small id="surnameHelp" class="form-text text-muted">inclusief voorvoegsel</small>
        </div>
      </div>

      <div class="form-group row mt-3">
        <label for="postalCode" class="col-sm-2 col-form-label">Postcode</label>
        <div class="col-sm-10">
          <input class="form-control col-sm-2" formControlName="postalCode" id="postalCode">
          <div *ngIf="getControl['postalCode'].touched && getControl['postalCode'].invalid" class="text-danger">
            <div>Postal code is required.</div>
          </div>
          <small id="postalCodeHelp" class="form-text text-muted">De vier cijfers zijn voldoende. We gebruiken je postcode zodat scholen in
            jouw regio je kunnen vinden.</small>
        </div>
      </div>

      <div class="form-group row mt-3">
        <label for="privacy" class="col-sm-2 col-form-label">Akkoord</label>
        <div class="col-sm-10">
          <input type="checkbox" class="form-check-input" formControlName="privacy" id="privacy" value="yes">
          <div *ngIf="getControl['privacy'].touched && getControl['privacy'].invalid" class="text-danger">
            <div>Je moet aangeven dat je akkoord bent met de privacyvoorwaarden.</div>
          </div>
          <small id="privacyHelp" class="form-text text-muted">Ik heb de privacyvoorwaarden gelezen en ben akkoord.</small>
        </div>
      </div>

      <div class="form-group">
        <button id="register-teacher" class="btn btn-primary btn-sm" (click)="register()">Register</button>
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
    let email = new FormControl('', Validators.email)
    let password = new FormControl('', Validators.minLength(8))
    let password_repeat = new FormControl('', Validators.minLength(8))
    let postalCode = new FormControl('', Validators.pattern("\\d{4}"))
    let privacy = new FormControl('', Validators.requiredTrue)
    this.mainForm = this.fb.group({
      firstName: firstName,
      surname: surname,
      email: email,
      password: password,
      password_repeat: password_repeat,
      postalCode: postalCode,
      privacy: privacy
    });

    firstName.valueChanges.pipe(debounceTime(1000)).subscribe(x => {
      console.log('first name ' + x);
    })
    surname.valueChanges.pipe(debounceTime(1000)).subscribe(x => {
      console.log('surname  ' + x);
    })
    email.valueChanges.pipe(debounceTime(1000)).subscribe(x => {
      console.log('surname  ' + x);
    })
    postalCode.valueChanges.pipe(debounceTime(1000)).subscribe(x => {
      console.log('surname  ' + x);
    })
  }

  get getControl() {
    return this.mainForm.controls;
  }

  register() {

  }

}
