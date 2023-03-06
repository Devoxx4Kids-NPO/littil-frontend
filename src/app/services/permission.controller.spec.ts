import { TestBed } from '@angular/core/testing';
import { PermissionController } from './permission.controller';

describe.skip('PermissionController', () => {
  let controller: PermissionController;

  beforeEach(() => {
    controller = TestBed.inject(PermissionController);
  });
  it('should be created', () => {
    expect(controller).toBeTruthy();
  });
});
