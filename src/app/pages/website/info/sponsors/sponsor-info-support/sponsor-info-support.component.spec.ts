import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorInfoSupportComponent } from './sponsor-info-support.component';

describe('SponsorInfoSupportComponent', () => {
  let component: SponsorInfoSupportComponent;
  let fixture: ComponentFixture<SponsorInfoSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorInfoSupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorInfoSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
