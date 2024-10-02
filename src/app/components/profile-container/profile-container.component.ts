import { Component, Input, OnInit } from '@angular/core';
import { PermissionController, Roles } from '../../services/permission.controller';

@Component({
  selector: 'littil-profile-container',
  templateUrl: './profile-container.component.html',
})
export class ProfileContainerComponent implements OnInit {
  @Input() title?: string;

  public isGuestTeacher = true;

  constructor(private permissionController: PermissionController) {}

  ngOnInit(): void {
    this.isGuestTeacher = this.permissionController.getRoleType() === Roles.GuestTeacher;
  }
}
