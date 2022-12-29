import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompleteProfileModalComponent } from '../../components/complete-profile-modal/complete-profile-modal.component';
import {
  IModalComponentOptions,
  ModalController,
} from '../../components/modal/modal.controller';

@Component({
  selector: 'littil-complete-profile',
  templateUrl: './complete-profile.component.html',
})
export class CompleteProfilePageComponent implements OnInit {
  constructor(
    private router: Router,
    private modalController: ModalController
  ) {}

  async ngOnInit(): Promise<void> {
    await this.modalController.present(CompleteProfileModalComponent, {
      modalSize: undefined,
      disableClose: true,
    } as IModalComponentOptions);
    this.router.navigateByUrl('/admin/search');
  }
}
