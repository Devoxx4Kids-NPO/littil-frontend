import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainMenuButtonComponent } from './main-menu-button.component';

describe('MainMenuButtonComponent', () => {
  let component: MainMenuButtonComponent;
  let fixture: ComponentFixture<MainMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainMenuButtonComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuButtonComponent);
    component = fixture.componentInstance;
    component.path = '/routerLink';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
