import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { TitleComponent } from '../../../components/title/title.component';
import { AboutUsComponent } from './about-us.component';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AboutUsComponent,
        TitleComponent,
        ContentContainerComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
