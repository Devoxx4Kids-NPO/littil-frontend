import { Component } from '@angular/core';
import { ProfileContainerComponent } from '../../../components/profile-container/profile-container.component';

@Component({
  selector: 'littil-change-email',
  templateUrl: './change-email.component.html',
  standalone: true,
  imports: [
	  ProfileContainerComponent,
   ],
})
export class ChangeEmailComponent { }
