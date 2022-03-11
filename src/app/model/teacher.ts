export class Teacher {
  static CREATED_EVENT = 'teacher-created';
  static UPDATED_EVENT = 'teacher-updated';
  static DELETED_EVENT = 'teacher-deleted';

  id: string
  firstName: string;
  surname: string;
  email: string;
  postalCode: string;
  gender: string | undefined;
  country: string = "nl"
  preferences: string | undefined;
  availability: string | undefined;

  constructor(id: string, firstName: string, surname: string, email: string, postalCode: string) {
    this.id = id;
    this.firstName = firstName;
    this.surname = surname;
    this.email = email;
    this.postalCode = postalCode;
  }
}

export class TeacherUpdate {
  id: string;
  firstName: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  postalCode: string | undefined;
  gender: string | undefined;
  country: string = "nl"
  preferences: string | undefined;
  availability: string | undefined;

  constructor(id: string) {
    this.id = id;
  }
}

export class TeacherCreate {
  firstName: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  password: string | undefined;
  postalCode: string | undefined;
  gender: string | undefined;
  country: string = "nl"
  preferences: string | undefined;
  availability: string | undefined;

}
