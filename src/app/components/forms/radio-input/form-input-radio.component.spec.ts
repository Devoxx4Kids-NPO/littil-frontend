import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  createFakeEvent,
  createTouchEvent,
  SpectatorElement,
} from '@ngneat/spectator';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { FormInputRadioComponent } from './form-input-radio.component';

describe('FormInputRadioComponent', () => {
  let spectator: Spectator<FormInputRadioComponent>;
  let onChangeSpy: jest.SpyInstance;
  let onValueChangedSpy: jest.SpyInstance;
  let onTouchedSpy: jest.SpyInstance;
  const createComponent = createComponentFactory(FormInputRadioComponent);

  beforeEach(() => {
    spectator = createComponent();
    spectator.debugElement.injector.get(NG_VALUE_ACCESSOR);
    spectator.setInput('radioInputs', [
      {
        id: '1',
        description: 'radio 1',
        checked: false,
      },
      {
        id: '2',
        description: 'radio 2',
        checked: false,
      },
    ]);
    spectator.detectChanges();
    onValueChangedSpy = jest.spyOn(spectator.component.onValueChanged, 'emit');
    onChangeSpy = jest.spyOn(spectator.component, 'onChange');
    onTouchedSpy = jest.spyOn(spectator.component, 'onTouched');
  });

  it('should create instance', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('writeValue', () => {
    it('should call onChange when value getter is called', async () => {
      spectator.component.value = 'Language NL';
      expect(spectator.component.value).toEqual('Language NL');
      expect(onValueChangedSpy).toHaveBeenCalledTimes(1);
      expect(onValueChangedSpy).toHaveBeenCalledWith('Language NL');
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith('Language NL');
    });
    it('should write value', async () => {
      spectator.component.writeValue('Language NL');
      expect(spectator.component.value).toEqual('Language NL');
    });
  });

  describe('onChange event', () => {
    it('should call onChange event', async () => {
      const input = spectator.query('[data-test="radio-1"]');
      const changeEvent = createFakeEvent('change');
      input?.dispatchEvent(changeEvent);
      spectator.detectChanges();
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith('1');
    });
  });

  describe('onTouch event', () => {
    it('should call onTouched event', async () => {
      const input = spectator.query(
        '[data-test="radio-1"]'
      ) as SpectatorElement;
      const touchEvent = createTouchEvent('touched');
      spectator.dispatchTouchEvent(input, 'touched');
      expect(onTouchedSpy).toHaveBeenCalledTimes(1);
      expect(onTouchedSpy).toHaveBeenCalledWith(touchEvent);
    });
  });

  describe('registerOnChange', () => {
    it('should set function to onChange', async () => {
      const fn = jest.fn(() => {
        console.log('onchange function');
      });
      spectator.component.registerOnChange(fn);
      expect(spectator.component.onChange).toStrictEqual(fn);
    });
  });

  describe('registerOnTouched', () => {
    it('should set function to onnTouched', async () => {
      const fn = jest.fn(() => {
        console.log('ontouched function');
      });
      spectator.component.registerOnTouched(fn);
      expect(spectator.component.onTouched).toStrictEqual(fn);
    });
  });

  describe('setDisabledState', () => {
    it('should disable/enable input', async () => {
      spectator.component.setDisabledState(true);
      expect(spectator.component.disabled).toBeTruthy();
      spectator.component.setDisabledState(false);
      expect(spectator.component.disabled).toBeFalsy();
    });
  });

  describe('Template', () => {
    it('should set correct classes on normal state', async () => {
      expect(spectator.query('[data-test="radio-1"]')).toHaveClass(
        'border-yellow-100 checked:bg-yellow-100 checked:border-yellow-200 focus:border-yellow-200 focus:ring-yellow-200'
      );
    });
    it('should set correct classes on invalid state', async () => {
      //spectator.setInput('errorMessage', 'Choose');
      spectator.setInput('hasError', true);
      expect(spectator.query('[data-test="radio-1"]')).toHaveClass(
        'border-red-500 checked:bg-red-500 checked:border-red-600 focus:border-red-500 focus:ring-red-600'
      );
    });
    it('should show errorMessage on invalid state', async () => {
      //spectator.setInput('errorMessage', 'Choose');
      spectator.setInput('hasError', true);
      expect(spectator.query('p')).toBeDefined();
      //expect(spectator.query('p')).toHaveText('Choose');
    });
    it('should set correct classes on disabled state', async () => {
      spectator.setInput('disabled', true);
      expect(spectator.query('[data-test="radio-1"]')).toHaveClass(
        'border-gray-50 checked:bg-gray-50 checked:border-gray-50 focus:ring-0 placeholder:text-gray-50'
      );
    });
  });
});
