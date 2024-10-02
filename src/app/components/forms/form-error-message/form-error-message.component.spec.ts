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
});
