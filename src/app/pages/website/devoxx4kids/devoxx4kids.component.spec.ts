import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '@ngneat/spectator';
import { Devoxx4kidsComponent } from './devoxx4kids.component';

describe('Devoxx4kidsComponent', () => {
  let component: Devoxx4kidsComponent;
  let fixture: ComponentFixture<Devoxx4kidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: ActivatedRoute, useValue: ActivatedRouteStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(Devoxx4kidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
