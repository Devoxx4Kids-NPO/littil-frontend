import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisclaimerComponent } from './disclaimer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../../components/forms/form-base';
import { TitleComponent } from '../../../components/title/title.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';

describe('DisclaimerComponent', () => {
  let component: DisclaimerComponent;
  let fixture: ComponentFixture<DisclaimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        DisclaimerComponent,
        TitleComponent,
        ContentContainerComponent,
        FormBaseComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DisclaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
