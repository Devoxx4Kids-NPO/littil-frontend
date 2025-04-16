import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ErrorModalComponent } from './error-modal.component';

describe('ErrorModalComponent', () => {
  let spectator: Spectator<ErrorModalComponent>;
  let component: ErrorModalComponent;

  let closeModalSpy: jest.SpyInstance;
  let closeSpy: jest.SpyInstance;

  const createComponent = createComponentFactory({
    component: ErrorModalComponent,
    declareComponent: false,
    declarations: [],
    imports: [NoopAnimationsModule],
    providers: [],
    mocks: [],
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    });
    spectator = createComponent();
    spectator.component.close = () => true;
    spectator.detectChanges();
    component = spectator.component;
    closeModalSpy = jest.spyOn(component, 'closeModal');
    closeSpy = jest.spyOn(component, 'close');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('closeModal', () => {
    it('should close modal when clicked on cancel', async () => {
      component.closeModal();
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Template', () => {
    it('should show error text', () => {
      expect(spectator.query('h1')).toBeDefined();
      expect(spectator.query('h1')?.textContent).toEqual('Oeps, er ging iets mis');
      expect(spectator.query('p')).toBeDefined();
      expect(spectator.query('p')?.textContent).toEqual(
        'Ververs de pagina en probeer het opnieuw.'
      );
    });
  });
});
