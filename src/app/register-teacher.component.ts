import {Component} from "@angular/core";
import {EventBus} from "./services/event-bus";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

@Component({
  //to indicate that html and css are relative to the component
  template: `
    <h3>Register as a teacher</h3>
    <form [formGroup]="mainForm" class="main-ui-block">
      <div>
        <table class="table table-bordered table-hover table-condensed col-sm-3">
          <tbody>
          <tr>
            <td>Voornaam</td>
            <td><input class="quiet" formControlName="firstName" id="firstName"></td>
          </tr>
          <tr>
            <td>Achternaam</td>
            <td><input class="quiet" formControlName="surname"></td>
          </tr>
        <!--  <tr>
            <td>Woonplaats of postcode</td>
            <td><input class="quiet" formControlName="townOrPostCode"></td>
          </tr>-->
          </tbody>
        </table>
        <button id="add-part" class="btn btn-secondary btn-sm" (click)="register()" i18n="button|Add part">Register</button>
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
    this.mainForm = this.fb.group({
      firstName, surname
    });

    firstName.valueChanges.pipe(debounceTime(1000)).subscribe(x => {
      console.log('first name ' + x);
    })

    surname.valueChanges.pipe(debounceTime(1000)).subscribe(x => {
      console.log('surname  '+ x);
    })
  }



  register() {

  }

}
