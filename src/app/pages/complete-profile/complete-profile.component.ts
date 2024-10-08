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

  async ngOnInit(): Promise<any> {
    return Promise.resolve().then(async () => {
      if (this.permissionController.hasAnyRole()) {
        await this.router.navigateByUrl('/user/search');
        return;
      }
      return this.modalController
        .present(CompleteProfileModalComponent, {
          modalSize: undefined,
          disableClose: true,
        } as IModalComponentOptions)
        .then(() => {
          return this.router.navigateByUrl('/user/search');
        });
    });
  }
}
