import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentContainerComponent } from '../../../../components/content-container/content-container.component';
import { TitleComponent } from '../../../../components/title/title.component';
import { InformationComponent } from './information.component';
import {ContactBannerComponent} from "../../../../components/contact-banner/contact-banner.component";

describe('InformationComponent', () => {
  let component: InformationComponent;
  let fixture: ComponentFixture<InformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InformationComponent,
        TitleComponent,
        ContentContainerComponent,
        ContactBannerComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
