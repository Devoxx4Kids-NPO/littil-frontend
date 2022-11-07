import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentContainerComponent } from '../../../../components/content-container/content-container.component';
import { TitleComponent } from '../../../../components/title/title.component';
import { SponsorsComponent } from './sponsors.component';

describe('SponsorsComponent', () => {
  let component: SponsorsComponent;
  let fixture: ComponentFixture<SponsorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SponsorsComponent,
        TitleComponent,
        ContentContainerComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
