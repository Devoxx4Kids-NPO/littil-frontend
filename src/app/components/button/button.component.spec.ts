import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent>;
  const createComponent = createComponentFactory({
    component: ButtonComponent,
    declareComponent: false,
  });
  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create instance', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('onClick', () => {
    it('should emit click', () => {
      jest.spyOn(spectator.component.onClick, 'emit');
      spectator.triggerEventHandler('button', 'click', 'eventValue');
      expect(spectator.component.onClick.emit).toHaveBeenCalledTimes(1);
      expect(spectator.component.onClick.emit).toHaveBeenCalledWith('eventValue');
    });
  });
  describe('Template', () => {
    it('should set color class [default]', () => {
      expect(spectator.query('button')).toHaveClass('bg-blue-200');
    });
    it('should set inline class', () => {
      expect(spectator.query('button')).toHaveClass('w-full');
      expect(spectator.query('button')).not.toHaveClass('mr-1');
      spectator.setInput('inline', true);
      expect(spectator.query('button')).not.toHaveClass('w-full');
      expect(spectator.query('button')).toHaveClass('mr-1');
    });
    it('should apply customColorClass when provided', () => {
      spectator.setInput('customColorClass', 'bg-purple-500 hover:bg-purple-600');
      spectator.setInput('color', undefined);
      spectator.detectChanges();
      const button = spectator.query('button');
      expect(button).toHaveClass('bg-purple-500');
      expect(button).toHaveClass('hover:bg-purple-600');
    });
    it('should apply color variant when color input is provided', () => {
      spectator.setInput('color', 'red');
      spectator.detectChanges();
      const button = spectator.query('button');
      expect(button).toHaveClass('bg-red-600');
      expect(button).toHaveClass('hover:bg-red-500');
    });
    it('should apply disabled color variant when button is disabled', () => {
      spectator.setInput('color', 'red');
      spectator.setInput('disabledColor', 'gray');
      spectator.setInput('disabled', true);
      spectator.detectChanges();
      const button = spectator.query('button');
      expect(button).toHaveClass('bg-gray-300');
      expect(button).toHaveClass('hover:bg-gray-300');
    });
  });
});
