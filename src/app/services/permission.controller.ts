import { Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';

export interface IAuth0Authorizations {
  guest_teachers: any[];
  schools: any[];
}

export enum Roles {
  School = 'schools',
  GuestTeacher = 'guest_teachers',
}

export const roleHierarchy = [Roles.School, Roles.GuestTeacher];

@Injectable({
  providedIn: 'root',
})
export class PermissionController {
  loggedIn: boolean = false;
  activeAccount!: User;
  userId!: string;
  roles: string[] = [];
  authorizations!: IAuth0Authorizations;
  protected _onPermissionChange = new Subject<void>();
  onPermissionChange = this._onPermissionChange.asObservable();

  handleNewUser(user: User): void {
    this.activeAccount = user;
    this.userId = user['https://littil.org/littil_user_id'];
    this.roles = user['https://littil.org/roles'];
    this.setAuthorizations(user['https://littil.org/authorizations']);
  }

  setAuthorizations(authorizations: IAuth0Authorizations) {
    this.authorizations = authorizations;
    this._onPermissionChange.next();
  }

  getRoleType(): Roles {
    if (this.authorizations && this.authorizations.schools.length > 0) {
      return Roles.School;
    }
    if (this.authorizations && this.authorizations.guest_teachers.length > 0) {
      return Roles.GuestTeacher;
    }
    throw new Error('RoleType not found');
  }

  getRoleId(): string {
    if (this.authorizations && this.authorizations.schools.length > 0) {
      return this.authorizations.schools[0];
    }
    if (this.authorizations && this.authorizations.guest_teachers.length > 0) {
      return this.authorizations.guest_teachers[0];
    }
    throw new Error('RoleId not found');
  }

  hasAnyRole(): boolean {
    return (
      this.authorizations &&
      (this.authorizations.guest_teachers.length > 0 ||
        this.authorizations.schools.length > 0)
    );
  }

  hasAdminRole(): boolean {
    return this.roles.includes("admin");
  }
}
