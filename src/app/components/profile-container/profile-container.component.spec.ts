import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';
import { PermissionController, Roles } from '../../services/permission.controller';
import { ProfileContainerComponent } from './profile-container.component';

describe('ProfileContainerComponent', () => {
  let component: ProfileContainerComponent;
  let fixture: ComponentFixture<ProfileContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRouteStub },
        MockProvider(PermissionController, {
          getRoleType: () => Roles.GuestTeacher,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isGuestTeacher).toBe(true);
  });
});
