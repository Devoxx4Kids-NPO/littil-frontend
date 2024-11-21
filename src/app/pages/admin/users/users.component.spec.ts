import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { User } from '../../../api/generated';
import { ButtonComponent } from '../../../components/button/button.component';
import { ContactBannerComponent } from '../../../components/contact-banner/contact-banner.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { TitleComponent } from '../../../components/title/title.component';
import { LittilUserService } from '../../../services/littil-user/littil-user.service';
import { UsersComponent } from './users.component';

const littilUsers: User[] = [
  {
    id: '12345',
    emailAddress: 'test-user@littil.org',
    provider: 'AUTH0',
    providerId: 'auth0|12345',
  },
];

function getUserServiceDef() {
  return {
    imports: [
      UsersComponent,
      TitleComponent,
      ButtonComponent,
      ContentContainerComponent,
      ContactBannerComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
      MockProvider(LittilUserService, {
        getAll: () => of(littilUsers),
      }),
      { provide: ActivatedRoute, useValue: ActivatedRouteStub },
    ],
  };
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(getUserServiceDef()).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display users when data is available', () => {
    // userServiceMock.getAll.and.returnValue(of(users));
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(1);
  });
});
