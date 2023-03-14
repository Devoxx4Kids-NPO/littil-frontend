import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ContentContainerComponent} from '../../../../components/content-container/content-container.component';
import {TitleComponent} from '../../../../components/title/title.component';
import {SpecialistsComponent} from './specialists.component';
import {ContactBannerComponent} from "../../../../components/contact-banner/contact-banner.component";

describe('SpecialistsComponent', () => {
  let component: SpecialistsComponent;
  let fixture: ComponentFixture<SpecialistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SpecialistsComponent,
        TitleComponent,
        ContentContainerComponent,
        ContactBannerComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
