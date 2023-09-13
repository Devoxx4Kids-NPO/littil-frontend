import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { IMenuItem, menuRoutes, MenuType } from './pages/menu.routes';
import { PermissionController } from './services/permission.controller';
import  feedbackfin from "feedbackfin";
import {getLittilConfigFromWindow} from "../littilConfig";

const littilConfig = getLittilConfigFromWindow();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public menuRoutes: IMenuItem[] = menuRoutes;
  window:any;

  constructor(
    public readonly permissionController: PermissionController,
    @Inject(DOCUMENT) public document: Document
  ) {}

  public ngOnInit(): void {
    this.window = this.document.defaultView
    this.window.feedbackfin = { ...feedbackfin };
    this.window.feedbackfin.config.url = littilConfig.apiHost + "/api/v1/feedback";
    this.window.feedbackfin.config.mode = "form";

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
