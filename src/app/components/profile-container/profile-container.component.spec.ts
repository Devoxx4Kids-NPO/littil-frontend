import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContainerComponent } from './profile-container.component';
import { MockProvider} from "ng-mocks";
import {PermissionController, Roles} from "../../services/permission.controller";

describe('ProfileContainerComponent', () => {
  let component: ProfileContainerComponent;
  let fixture: ComponentFixture<ProfileContainerComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ ProfileContainerComponent]
      ,
      providers: [
        MockProvider(PermissionController, {
          getRoleType: () => Roles.GuestTeacher })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isGuestTeacher).toBe(true);
  });

});
