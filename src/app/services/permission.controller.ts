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
  currentRole: Roles = Roles.School;
  roleId: string | undefined;

  handleNewUser(user: User): void {
    this.activeAccount = user;
    this.userId = user['https://littil.org/littil_user_id'];
    this.roles = user['https://littil.org/roles'];
    this.setAuthorizations(user['https://littil.org/authorizations']);
    console.log('handleNewUser authorizations', user['https://littil.org/authorizations']);
  }

  setAuthorizations(authorizations: IAuth0Authorizations) {
    console.log('authorizations', authorizations);
    this.authorizations = authorizations;
    this._onPermissionChange.next();
  }

  setRoleType(role: Roles): void {
    this.currentRole = role;
  }

  getRoleType(): Roles {
    // if (this.authorizations && this.authorizations.schools.length > 0) {
    //   return Roles.School;
    // }
    // if (this.authorizations && this.authorizations.guest_teachers.length > 0) {
    //   return Roles.GuestTeacher;
    // }
    // throw new Error('RoleType not found');
    return this.currentRole;
  }

  getRoleId(): string | undefined {
    // if (this.authorizations && this.authorizations.schools.length > 0) {
    //   return this.authorizations.schools[0];
    // }
    // if (this.authorizations && this.authorizations.guest_teachers.length > 0) {
    //   return this.authorizations.guest_teachers[0];
    // }
    // throw new Error('RoleId not found');
    return this.roleId;
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

  public setRoleId(id: string | undefined): void {
    this.roleId = id;
  }
}
