import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../../components/forms/form-base';
import { FormInputTextComponent } from '../../../components/forms/text-input/form-input-text.component';
import { FormInputSelectComponent } from '../../../components/forms/select-input/form-input-select.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { TitleComponent } from '../../../components/title/title.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import {PrivacyPolicyComponent} from "./privacy-policy.component";

describe('PrivacyPolicyComponent', () => {
  let component: PrivacyPolicyComponent;
  let fixture: ComponentFixture<PrivacyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        PrivacyPolicyComponent,
        TitleComponent,
        ContentContainerComponent,
        FormBaseComponent,
        FormInputTextComponent,
        FormInputSelectComponent,
        ButtonComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
