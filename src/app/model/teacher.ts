export class Teacher {
  firstName: string;
  surname: string;
  email: string;
  postalCode: string;
  gender: string | undefined;
  country: string = "nl"
  preferences: string | undefined;
  availability: string | undefined;

  constructor(firstName: string, surname: string, email: string, postalCode: string) {
    this.firstName = firstName;
    this.surname = surname;
    this.email = email;
    this.postalCode = postalCode;
  }
}
