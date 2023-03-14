import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import {ButtonRoundedComponent} from "./button-rounded.component";

describe('ButtonRoundedComponent', () => {
  let spectator: Spectator<ButtonRoundedComponent>;
  const createComponent = createComponentFactory(ButtonRoundedComponent);
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
      expect(spectator.component.onClick.emit).toHaveBeenCalledWith(
        'eventValue'
      );
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
  });
});
