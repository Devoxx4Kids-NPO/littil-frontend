import { TestBed } from '@angular/core/testing';
import { ProfileController } from './profile.controller';

describe.skip('ProfileController', () => {
  let controller: ProfileController;

  beforeEach(() => {
    controller = TestBed.inject(ProfileController);
  });
  it('should be created', () => {
    expect(controller).toBeTruthy();
  });
});
