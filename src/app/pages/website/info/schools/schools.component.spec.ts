import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from '../../../../components/button/button.component';
import { ContentContainerComponent } from '../../../../components/content-container/content-container.component';
import { TitleComponent } from '../../../../components/title/title.component';
import { SchoolsComponent } from './schools.component';
import {ContactBannerComponent} from "../../../../components/contact-banner/contact-banner.component";

describe('SchoolsComponent', () => {
  let component: SchoolsComponent;
  let fixture: ComponentFixture<SchoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SchoolsComponent,
        TitleComponent,
        ButtonComponent,
        ContentContainerComponent,
        ContactBannerComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
