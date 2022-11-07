import { Injectable, OnInit } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';
import { roleHierarchy, Roles } from './role-guard.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionController implements OnInit {
  loggedIn: boolean = false;
  activeAccount!: User;
  roles: Roles[] = [];
  protected _onPermissionChange = new Subject<void>();
  onPermissionChange = this._onPermissionChange.asObservable();

  ngOnInit(): void {}

  setRoles(roles: Roles[]) {
    this.roles = roles;
    this._onPermissionChange.next();
  }

  hasRole(role: Roles): boolean {
    for (let s of this.roles) {
      if (`${s}` === `${role}`) {
        return true;
      }
    }
    return false;
  }

  hasRoles(roles: Roles[]): boolean {
    if (!Array.isArray(roles)) {
      return false;
    }
    for (let p of roles) {
      if (!this.hasRole(p)) {
        return false;
      }
    }
    return true;
  }

  hasAnyRoles(roles?: Roles[]): boolean {
    if (!Array.isArray(roles)) {
      roles = roleHierarchy;
    }
    return roles.findIndex((p) => this.hasRole(p)) !== -1;
  }
}
