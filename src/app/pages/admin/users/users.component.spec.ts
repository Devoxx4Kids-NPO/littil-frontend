import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from '../../../components/button/button.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { TitleComponent } from '../../../components/title/title.component';
import { UsersComponent } from './users.component';
import {ContactBannerComponent} from "../../../components/contact-banner/contact-banner.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MockProvider} from "ng-mocks";
import {of} from "rxjs";
import {LittilUserService} from "../../../services/littil-user/littil-user.service";
import {User} from "../../../api/generated";
import {By} from "@angular/platform-browser";


const littilUsers: User[] = [
  {"id": "12345", "emailAddress": "test-user@littil.org",
    "provider": "AUTH0", "providerId" : "auth0|12345"}
]

function getUserServiceDef() {
  return {
    declarations: [
      UsersComponent,
      TitleComponent,
      ButtonComponent,
      ContentContainerComponent,
      ContactBannerComponent
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
      MockProvider(LittilUserService, {
        getAll: () => of(littilUsers),
      }),
    ]
  };
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(getUserServiceDef())
      .compileComponents();

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
