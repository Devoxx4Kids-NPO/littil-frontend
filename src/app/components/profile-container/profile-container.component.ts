import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionController, Roles } from '../../services/permission.controller';
import { ContentContainerComponent } from '../content-container/content-container.component';

@Component({
  selector: 'littil-profile-container',
  templateUrl: './profile-container.component.html',
  standalone: true,
  imports: [CommonModule, ContentContainerComponent, RouterModule],
})
export class ProfileContainerComponent implements OnInit {
  @Input() title?: string;

  public isGuestTeacher = true;

  constructor(private permissionController: PermissionController) {}

  ngOnInit(): void {
    this.isGuestTeacher = this.permissionController.getRoleType() === Roles.GuestTeacher;
  }
}
