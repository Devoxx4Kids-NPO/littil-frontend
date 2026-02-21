import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorAramcoEuropeComponent } from './sponsor-aramco-europe.component';

describe('SponsorAramcoEuropeComponent', () => {
  let component: SponsorAramcoEuropeComponent;
  let fixture: ComponentFixture<SponsorAramcoEuropeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorAramcoEuropeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorAramcoEuropeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
