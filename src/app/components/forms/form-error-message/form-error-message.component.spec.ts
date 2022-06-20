import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { FormErrorMessageComponent } from './form-error-message.component';

describe('FormErrorMessageComponent', () => {
  let spectator: Spectator<FormErrorMessageComponent>;
  const createComponent = createComponentFactory(FormErrorMessageComponent);

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create instance', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('Template', () => {
    it('should show error text', () => {
      spectator.setInput('errorText', 'Test error message');
      expect(spectator.query('p')?.textContent).toEqual('Test error message');
    });
  });
});
