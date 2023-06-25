import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PermissionController, Roles} from "../../services/permission.controller";

@Component({
  selector: 'littil-profile-container',
  templateUrl: './profile-container.component.html'
})
export class ProfileContainerComponent implements OnInit {
  @Input() title?: string;

    public isGuestTeacher = true;

  constructor(
    private router: Router,
    private permissionController: PermissionController
  ) { }

  ngOnInit(): void {
      this.isGuestTeacher = this.permissionController.getRoleType() === Roles.GuestTeacher;
  }

}
