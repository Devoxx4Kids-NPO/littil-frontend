import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { IMenuItem, menuRoutes, MenuType } from './pages/menu.routes';
import { PermissionController } from './services/permission.controller';
import feedbackfin from 'feedbackfin';
import { getLittilConfigFromWindow } from '../littilConfig';

const littilConfig = getLittilConfigFromWindow();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public menuRoutes: IMenuItem[] = menuRoutes;

  constructor(
    public readonly permissionController: PermissionController,
    @Inject(DOCUMENT) public document: Document
  ) {
  }

  public ngOnInit(): void {
    const littilFeedbackFin = {
      ...feedbackfin,
    };
    littilFeedbackFin.config.url = littilConfig.apiHost + '/api/v1/feedback';
    littilFeedbackFin.config.mode = 'form';

    (this.document.defaultView as any).feedbackfin = littilFeedbackFin;

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
