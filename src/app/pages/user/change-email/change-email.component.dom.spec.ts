
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeEmailComponent } from './change-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { LittilUserService } from '../../../services/littil-user/littil-user.service';
import { PermissionController } from "../../../services/permission.controller";
import { ActivatedRoute } from "@angular/router";
import { ActivatedRouteStub } from "@ngneat/spectator";
import { CommonModule } from "@angular/common";
import { ProfileContainerComponent } from "../../../components/profile-container/profile-container.component";
import {   FormErrorMessageComponent } from "../../../components/forms/form-error-message/form-error-message.component";
import {   FormInputTextComponent } from "../../../components/forms/text-input/form-input-text.component";
import { ButtonComponent } from "../../../components/button/button.component";

// ---- Service Mocks ----
const permissionControllerMock: Partial<PermissionController> = {
  userId: 'user-123',
  getRoleType: jest.fn().mockReturnValue('schools'),
};

const littilUserServiceMock: Partial<LittilUserService> = {
  emailVerificationCode: jest.fn(),
  changeEmail: jest.fn(),
};

describe('ChangeEmailComponent (DOM)', () => {
  let fixture: ComponentFixture<ChangeEmailComponent>;
  let component: ChangeEmailComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Standalone component => include in imports (no declarations)
      imports: [
        CommonModule,
        ProfileContainerComponent,
        FormErrorMessageComponent,
        FormInputTextComponent,
        ReactiveFormsModule,
        ButtonComponent,
        ChangeEmailComponent
      ],
      providers: [
        { provide: LittilUserService, useValue: littilUserServiceMock },
        { provide: PermissionController, useValue: permissionControllerMock },
        { provide: ActivatedRoute, useValue: ActivatedRouteStub },
      ],
      // Ignore unknown custom elements such as <littil-button>, <littil-form-input-text>, etc.
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ---------------------------------------------------------
  // Creation & initial DOM
  // ---------------------------------------------------------
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders instructions by default (hideForm=false)', async () => {
    // Initial state in component: hideForm is false => instructions visible
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    const instructions = fixture.nativeElement.querySelector('[data-test="instructions"]');
    expect(instructions).not.toBeNull();
    expect(instructions.textContent).toContain('Vul uw nieuwe e-mailadres in');
  });

  // ---------------------------------------------------------
  // Confirm new email flow
  // ---------------------------------------------------------
  it('shows the confirmation UI (verification code input) after confirming email successfully', async () => {
    // Arrange: enter a valid email and mock successful backend
    component.changeEmailForm.get('email')?.setValue('valid@example.com');
    (littilUserServiceMock.emailVerificationCode as jest.Mock).mockReturnValue(
      of(new HttpResponse({ status: 200, statusText: 'OK', body: {} }))
    );

    // Act: call public method
    component.onClickConfirmNewEmail();
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    // Assert: verification UI visible
    const verifyInstructions = fixture.nativeElement.querySelector('[data-test="verification-instructions"]');
    const verificationInput = fixture.nativeElement.querySelector('[data-test="input-verification-code"]');
    const changeEmailButton = fixture.nativeElement.querySelector('[data-test="changeEmailButton"]');
    const cancelButton = fixture.nativeElement.querySelector('[data-test="cancelButton"]');
    expect(verifyInstructions).not.toBeNull();
    expect(verificationInput).not.toBeNull();
    expect(changeEmailButton).not.toBeNull();
    expect(cancelButton).not.toBeNull();

    // Original confirm button should be gone
    const confirmBtn = fixture.nativeElement.querySelector('[data-test="sendVerificationCodeButton"]');
    expect(confirmBtn).toBeNull();

    // Service called correctly
    expect(littilUserServiceMock.emailVerificationCode).toHaveBeenCalledWith('user-123', {
      emailAddress: 'valid@example.com',
    });
  });

  it('Bevestig button presence depends on emailConfirmed=false; disabled toggles with email validity', async () => {
    // Initially emailConfirmed=false, so the confirm button should be present
    component.changeEmailForm.get('email')?.setValue('invalid-email');
    fixture.detectChanges();
    await fixture.whenStable();

    const btn = fixture.nativeElement.querySelector('[data-test="confirmEmailButton"] button');
    expect(btn).not.toBeNull();
    expect(btn.disabled).toBeTruthy();
  });

  // ---------------------------------------------------------
  // Change email action & confirmation panel
  // ---------------------------------------------------------
  it('shows the confirmation panel after changeEmail succeeds, with the new email in the message', async () => {
    // Arrange: we are in verify step (emailConfirmed true because of previous action)
    // Drive via public API: set form fields to simulate user input
    component.changeEmailForm.get('email')?.setValue('new@example.com');
    component.changeEmailForm.get('verificationCode')?.setValue('123456');

    (littilUserServiceMock.changeEmail as jest.Mock).mockReturnValue(
      of(new HttpResponse({ status: 200, statusText: 'OK', body: {} }))
    );

    // Act
    component.onClickChangeEmail();
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    // Assert: confirmation panel visible with email
    const confirmationMessage = fixture.nativeElement.querySelector('[data-test="confirmation-message"]');
    const confirmationEmail = fixture.nativeElement.querySelector('[data-test="confirmation-email"]');
    expect(confirmationMessage).not.toBeNull();
    expect(confirmationMessage.textContent).toContain('Uw e-mailadres is gewijzigd.');
    expect(confirmationEmail).not.toBeNull();
    expect(confirmationEmail.textContent).toContain('new@example.com');

    // Assert: form instructions are gone (form hidden via @if)
    const instructions = fixture.nativeElement.querySelector('[data-test="instructions"]');
    expect(instructions).toBeNull();

    // Service called correctly
    expect(littilUserServiceMock.changeEmail).toHaveBeenCalledWith('user-123', {
      newEmailAddress: 'new@example.com',
      verificationCode: '123456',
    });
  });

  // ---------------------------------------------------------
  // Cancel flow (protected method)
  // ---------------------------------------------------------
  it('shows cancel confirmation after cancel and hides verification UI', async () => {
    // Drive cancellation via the component's protected method
    (component as any).onClickCancel(); // bracket notation/cast to any to call protected
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    // Assert: cancel panel visible
    const cancelMessage = fixture.nativeElement.querySelector('[data-test="cancel-message"]');
    const cancelInfo = fixture.nativeElement.querySelector('[data-test="cancel-info"]');
    expect(cancelMessage).not.toBeNull();
    expect(cancelMessage.textContent).toContain('Uw e-mailadres is niet gewijzigd.');
    expect(cancelInfo).not.toBeNull();

    // Assert: verification UI gone
    const verificationInput = fixture.nativeElement.querySelector('[data-test="input-verification-code"]');
    expect(verificationInput).toBeNull();

    // Assert: confirm button absent
    const confirmBtn = fixture.nativeElement.querySelector('[data-test="sendVerificationCodeButton"]');
    expect(confirmBtn).toBeNull();
  });

});
