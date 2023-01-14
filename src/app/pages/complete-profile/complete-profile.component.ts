import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompleteProfileModalComponent } from '../../components/complete-profile-modal/complete-profile-modal.component';
import {
  IModalComponentOptions,
  ModalController,
} from '../../components/modal/modal.controller';
import { PermissionController } from '../../services/permission.controller';

@Component({
  selector: 'littil-complete-profile',
  templateUrl: './complete-profile.component.html',
})
export class CompleteProfilePageComponent implements OnInit {
  constructor(
    private router: Router,
    private modalController: ModalController,
    private permissionController: PermissionController
  ) {}

  async ngOnInit(): Promise<void> {
    return Promise.resolve().then(async () => {
      if (this.permissionController.hasAnyRole()) {
        this.router.navigateByUrl('/admin/search');
      }
      await this.modalController.present(CompleteProfileModalComponent, {
        modalSize: undefined,
        disableClose: true,
      } as IModalComponentOptions);
      this.router.navigateByUrl('/admin/search');
    });
  }
}
