import {createComponentFactory, Spectator} from "@ngneat/spectator/jest";
import {ContactModalComponent} from "./contact-modal.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MockComponent, MockProvider} from "ng-mocks";
import {FormInputTextComponent} from "../forms/text-input/form-input-text.component";
import {FormErrorMessageComponent} from "../forms/form-error-message/form-error-message.component";
import {ButtonComponent} from "../button/button.component";
import {ButtonRoundedComponent} from "../button/button-rounded.component";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {of} from "rxjs";
import {FormUtil} from "../../utils/form.util";
import {LittilUserService} from "../../services/littil-user/littil-user.service";
import {LittilContactService} from "../../services/littil-contact/littil-contact.service";
import {PermissionController} from "../../services/permission.controller";


describe('ContactModalComponent', () => {
  let spectator: Spectator<ContactModalComponent>;
  let component: ContactModalComponent;

  let contactSpy: jest.SpyInstance;
  let cancelSpy: jest.SpyInstance;
  let closeSpy: jest.SpyInstance;
  let formUtilSpy: jest.SpyInstance;

  const createComponent = createComponentFactory({
    component: ContactModalComponent,
    declarations: [
      MockComponent(FormInputTextComponent),
      // MockComponent(FormInputPasswordComponent),
      MockComponent(FormErrorMessageComponent),
      MockComponent(ButtonComponent),
      MockComponent(ButtonRoundedComponent),
    ],
    imports: [NoopAnimationsModule],
    providers: [
      // MockProvider(ContactService),
      MockProvider(LittilContactService, {
        sendEmail: () =>
          of({
            recipient: 'todo',
            medium: 'contactInfo',
            message: 'message',
          }),
      }),
      MockProvider(PermissionController, {
        activeAccount: {
          name: 'emailOfUser'
        }
      }),
      MockProvider(LittilUserService, {
        create: () =>
          of({
            emailAddress: 'email@email.com',
          }),
      }),
    ],
    mocks: [],
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    });
    spectator = createComponent();
    spectator.detectChanges();
    spectator.component.close = () => true;
    component = spectator.component;
    contactSpy = jest.spyOn(component, 'onClickSendEmail');
    cancelSpy = jest.spyOn(component, 'close');
    closeSpy = jest.spyOn(component, 'close');
    formUtilSpy = jest.spyOn(FormUtil, 'ValidateAll');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickSendEmail', () => {
    it('should call contact function when clicked on contact button', async () => {
      component.contactForm.get('contactInfo')?.setValue('contactInfo');
      component.contactForm.get('message')?.setValue('message');
      const contactBtn = spectator.query(
        '[data-test="sendEmailButton"]'
      ) as HTMLElement;
      if (contactBtn) {
        contactBtn.click();
      }
      expect(contactSpy).toHaveBeenCalledTimes(1);
    });

    it('should close modal without sendEmailTrigger when modal is closed with cancel button', async () => {
      component.contactForm.get('contactInfo')?.setValue('contactInfo');
      component.contactForm.get('message')?.setValue('message');
      const cancelBtn = spectator.query(
        '[data-test="cancelButton"]'
      ) as HTMLElement;
      if (cancelBtn) {
        cancelBtn.click();
      }
      expect(cancelSpy).toHaveBeenCalledTimes(1);
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not show confirmation or close modal when form is invalid', async () => {
      await component.onClickSendEmail();
      expect(contactSpy).toHaveBeenCalledTimes(1);
      expect(component.contactForm.invalid).toBe(true);
      expect(component.hideForm).toBe(false);
      expect(component.hideConfirmation).toBe(true);
      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should show confirmation when form is valid', async () => {
      component.contactForm.get('contactInfo')?.setValue('contactInfo');
      component.contactForm.get('message')?.setValue('message');
      await component.onClickSendEmail();
      expect(component.contactForm.invalid).toBe(false);
      expect(component.hideForm).toBe(true);
      expect(component.hideConfirmation).toBe(false);
      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should close modal when confirmation is closed with close button', async () => {
      component.contactForm.get('contactInfo')?.setValue('contactInfo');
      component.contactForm.get('message')?.setValue('message');
      await component.onClickSendEmail();
      spectator.detectChanges();
      expect(component.contactForm.invalid).toBe(false);
      expect(component.hideForm).toBe(true);
      expect(component.hideConfirmation).toBe(false);
      const cancelBtn = spectator.query(
        '[data-test="closeButton"]'
      ) as HTMLElement;
      if (cancelBtn) {
        cancelBtn.click();
      }
      expect(cancelSpy).toHaveBeenCalledTimes(1);
      expect(closeSpy).toHaveBeenCalledTimes(1);
      expect(closeSpy).toHaveBeenCalledWith();
    });

  });

  describe('Template', () => {
    it('should show register form', () => {
      expect(spectator.query('[data-test="form-contact"]')).toBeDefined();
    });
  });

});
