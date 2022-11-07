import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { TitleComponent } from '../../../components/title/title.component';
import { Devoxx4kidsComponent } from './devoxx4kids.component';

describe('Devoxx4kidsComponent', () => {
  let component: Devoxx4kidsComponent;
  let fixture: ComponentFixture<Devoxx4kidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        Devoxx4kidsComponent,
        TitleComponent,
        ContentContainerComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Devoxx4kidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
