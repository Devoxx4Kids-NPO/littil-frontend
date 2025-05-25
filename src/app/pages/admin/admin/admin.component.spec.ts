import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { TitleComponent } from '../../../components/title/title.component';
import { AdminComponent } from './admin.component';
import { UserStatistics } from "../../../api/generated";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MockProvider } from "ng-mocks";
import { LittilUserService } from "../../../services/littil-user/littil-user.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

const userStatistics: UserStatistics[] = [
  {
    authorizationType: 'user',
    count: 3,
    lastCreated: '2025-05-23T11:00:00Z'
  },
];

function getAdminServiceDef() {
  return {
    imports: [
      AdminComponent,
      CommonModule,
      ContentContainerComponent,
      TitleComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
      MockProvider(LittilUserService, {
        getUserStatistics: () => of(userStatistics),
      }),
    ],
  };
}

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(getAdminServiceDef()).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display statistics when data is available', () => {
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(1);
  });
});
