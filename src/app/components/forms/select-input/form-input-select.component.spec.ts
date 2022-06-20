import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  createFakeEvent,
  createTouchEvent,
  SpectatorElement,
} from '@ngneat/spectator';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { FormInputSelectComponent } from './form-input-select.component';

describe('FormInputSelectComponent', () => {
  let spectator: Spectator<FormInputSelectComponent>;
  let onChangeSpy: jest.SpyInstance;
  let onTouchedSpy: jest.SpyInstance;
  const createComponent = createComponentFactory(FormInputSelectComponent);

  beforeEach(() => {
    spectator = createComponent();
    spectator.debugElement.injector.get(NG_VALUE_ACCESSOR);
    spectator.detectChanges();
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
      const input = spectator.query('select');
      const changeEvent = createFakeEvent('change');
      input?.dispatchEvent(changeEvent);
      spectator.detectChanges();
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith('');
    });
  });

  describe('onTouch event', () => {
    it('should call onTouched event', async () => {
      const input = spectator.query('select') as SpectatorElement;
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
      spectator.setInput('id', 'firstName');
      spectator.setInput('label', 'Firstname');
      spectator.component.setDisabledState(true);
      expect(spectator.component.disabled).toBeTruthy();
      spectator.component.setDisabledState(false);
      expect(spectator.component.disabled).toBeFalsy();
    });
  });

  describe('Template', () => {
    it('should set correct classes on normal state', async () => {
      spectator.setInput('id', 'firstName');
      spectator.setInput('label', 'Firstname');
      expect(spectator.query('select')).toHaveClass(
        'border-yellow-100 focus:border-yellow-200 placeholder:text-yellow-100 focus:ring-yellow-200'
      );
      expect(spectator.query('select')).not.toHaveClass(
        'border-red-500 focus:border-red-500 focus:ring-red-600'
      );
      expect(spectator.query('select')).not.toHaveClass(
        'border-gray-50 focus:ring-0 placeholder:text-gray-50'
      );
    });
    it('should set correct classes on invalid state', async () => {
      spectator.setInput('id', 'firstName');
      spectator.setInput('label', 'Firstname');
      //spectator.setInput('errorMessage', 'Fill in your firstname');
      spectator.setInput('hasError', true);
      expect(spectator.query('select')).not.toHaveClass(
        'border-yellow-100 focus:border-yellow-200 placeholder:text-yellow-100 focus:ring-yellow-200'
      );
      expect(spectator.query('select')).toHaveClass(
        'border-red-500 focus:border-red-500 focus:ring-red-600'
      );
      expect(spectator.query('select')).not.toHaveClass(
        'border-gray-50 focus:ring-0 placeholder:text-gray-50'
      );
    });
    it('should show errorMessage on invalid state', async () => {
      spectator.setInput('id', 'firstName');
      spectator.setInput('label', 'Firstname');
      //spectator.setInput('errorMessage', 'Fill in your firstname');
      spectator.setInput('hasError', true);
      expect(spectator.query('p')).toBeDefined();
      //expect(spectator.query('p')).toHaveText('Fill in your firstname');
    });
    it('should set correct classes on disabled state', async () => {
      spectator.setInput('id', 'firstName');
      spectator.setInput('label', 'Firstname');
      spectator.setInput('disabled', true);
      expect(spectator.query('select')).not.toHaveClass(
        'border-yellow-100 focus:border-yellow-200 placeholder:text-yellow-100 focus:ring-yellow-200'
      );
      expect(spectator.query('select')).not.toHaveClass(
        'border-red-500 focus:border-red-500 focus:ring-red-600'
      );
      expect(spectator.query('select')).toHaveClass(
        'border-gray-50 focus:ring-0 placeholder:text-gray-50'
      );
    });
  });
});
