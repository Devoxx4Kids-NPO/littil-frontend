import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompleteProfileModalComponent } from '../../components/complete-profile-modal/complete-profile-modal.component';
import { PermissionController} from '../../services/permission.controller';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'littil-complete-profile',
  template: '',
})
export class CompleteProfilePageComponent implements OnInit {
  constructor(
    private router: Router,
    private permissionController: PermissionController,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<any> {
    try {

      if (this.permissionController.hasAnyRole()) {
        await this.router.navigateByUrl('/user/search');
        return;
      }

      this.showModalIfNeeded(true);

    } catch (error) {
      console.error('Error in ngOnInit:', error);
      throw error;
    }
  }

  showModalIfNeeded(condition: boolean) {
    if (condition) {
      const dialogRef = this.dialog.open(CompleteProfileModalComponent, {
        width: '800px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.router.navigateByUrl('/user/search');
        }
      });
    }
  }
}
