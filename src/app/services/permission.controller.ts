import { Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';

export interface IAuth0Authorizations {
  guest_teachers: any[];
  schools: any[];
}

export enum Roles {
  Admin = 'Admin',
  School = 'School',
  GuestTeacher = 'GuestTeacher',
}

export const roleHierarchy = [Roles.Admin, Roles.School, Roles.GuestTeacher];

@Injectable({
  providedIn: 'root',
})
export class PermissionController {
  loggedIn: boolean = false;
  activeAccount!: User;
  userId!: string;
  authorizations!: IAuth0Authorizations;
  protected _onPermissionChange = new Subject<void>();
  onPermissionChange = this._onPermissionChange.asObservable();

  handleNewUser(user: User): void {
    this.activeAccount = user;
    this.userId = user['https://littil.org/littil_user_id'];
    this.setRoles(user['https://littil.org/authorizations']);
  }

  setRoles(authorizations: IAuth0Authorizations) {
    this.authorizations = authorizations;
    this._onPermissionChange.next();
  }

  getRoles() {
    if(this.authorizations && this.authorizations.guest_teachers.length > 0 ) {
      return Roles.GuestTeacher;
    }
    if(this.authorizations && this.authorizations.schools.length > 0 ) {
      return Roles.School;
    }
    return Roles.GuestTeacher;
    //Todo: How do we know when user is an admin?
    //Todo: What happens when IAuth0Authorizations is empty?
  }

  hasAnyRole(): boolean {
    return (
      this.authorizations &&
      (this.authorizations.guest_teachers.length > 0 ||
        this.authorizations.schools.length > 0)
    );
  }
}
