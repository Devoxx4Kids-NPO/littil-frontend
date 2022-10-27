import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from "@angular/forms";
import { FormBaseComponent } from "../../../components/forms/form-base";
import { FormInputTextComponent } from "../../../components/forms/text-input/form-input-text.component";
import { FormInputSelectComponent } from "../../../components/forms/select-input/form-input-select.component";

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ ContactComponent, FormBaseComponent, FormInputTextComponent, FormInputSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
