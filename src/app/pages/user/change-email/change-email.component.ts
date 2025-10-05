import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileContainerComponent } from '../../../components/profile-container/profile-container.component';

@Component({
  selector: 'littil-change-email',
  templateUrl: './change-email.component.html',
  standalone: true,
  imports: [
	  CommonModule,
	  FormsModule,
	  ProfileContainerComponent,
   ],
})
export class ChangeEmailComponent { 
  newEmail: string = '';
  verificationCode: string = '';
  codeRequested: boolean = false;

  requestVerificationCode() {
    // Call your backend to send the code
    this.codeRequested = true;
  }

  submitEmailChange() {
    // Send newEmail and verificationCode to backend
  }
}
