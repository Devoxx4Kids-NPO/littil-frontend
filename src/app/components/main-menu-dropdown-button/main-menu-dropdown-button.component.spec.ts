import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuDropdownButtonComponent } from './main-menu-dropdown-button.component';

describe('MainMenuDropdownButtonComponent', () => {
  let component: MainMenuDropdownButtonComponent;
  let fixture: ComponentFixture<MainMenuDropdownButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMenuDropdownButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMenuDropdownButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
