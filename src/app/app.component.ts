import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { IMenuItem, menuRoutes, MenuType } from './pages/menu.routes';
import { PermissionController } from './services/permission.controller';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public menuRoutes: IMenuItem[] = menuRoutes;

  constructor(
    public readonly permissionController: PermissionController,
    @Inject(DOCUMENT) public document: Document
  ) {}

  public ngOnInit(): void {
    this.permissionController.onPermissionChange.subscribe(() => {
      const adminPages: IMenuItem[] = menuRoutes.filter(
        (route) => route.type === MenuType.Admin
      );
      adminPages.forEach((item: IMenuItem) => {
        item.disabled = !this.permissionController.loggedIn;
      });
    });
  }
}
