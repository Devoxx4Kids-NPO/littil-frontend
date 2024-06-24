import { TestBed } from '@angular/core/testing';
import { PermissionController, Roles } from './permission.controller';
import { User } from '@auth0/auth0-angular';

describe('PermissionController', () => {
  let service: PermissionController;
  let user: User;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionController);

    // Example user object
    user = {
      'https://littil.org/littil_user_id': '12345',
      'https://littil.org/roles': ['guest_teachers'],
      'https://littil.org/authorizations': {
        guest_teachers: ['guestTeacher1'],
        schools: []
      }
    } as User;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle new user and set activeAccount, userId, roles, and authorizations', () => {
    service.handleNewUser(user);
    expect(service.activeAccount).toEqual(user);
    expect(service.userId).toEqual('12345');
    expect(service.roles).toEqual(['guest_teachers']);
    expect(service.authorizations).toEqual(user['https://littil.org/authorizations']);
  });

  it('should return correct role type', () => {
    service.handleNewUser(user);
    expect(service.getRoleType()).toEqual(Roles.GuestTeacher);

    service.authorizations.schools = [];
    expect(service.getRoleType()).toEqual(Roles.GuestTeacher);
  });

  it('should throw error when role type not found', () => {
    service.setAuthorizations({ guest_teachers: [], schools: [] });
    expect(() => service.getRoleType()).toThrowError('RoleType not found');
  });

  it('should return correct role id', () => {
    service.handleNewUser(user);
    expect(service.getRoleId()).toEqual('guestTeacher1');

    service.authorizations =  {
      guest_teachers: [],
      schools: ['school1']
    };
    expect(service.getRoleId()).toEqual('school1');
  });

  it('should throw error when role id not found', () => {
    service.setAuthorizations({ guest_teachers: [], schools: [] });
    expect(() => service.getRoleId()).toThrowError('RoleId not found');
  });

  it('should return true if user has any role', () => {
    service.handleNewUser(user);
    expect(service.hasAnyRole()).toBeTruthy();

    service.setAuthorizations({ guest_teachers: [], schools: [] });
    expect(service.hasAnyRole()).toBeFalsy();
  });

  it('should return true if user has admin role', () => {
    service.roles = ['admin', 'user'];
    expect(service.hasAdminRole()).toBeTruthy();

    service.roles = ['user'];
    expect(service.hasAdminRole()).toBeFalsy();
  });
});
