import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { LITTILCONFIG, LittilConfig } from '../littilConfig';
import { FeedbackfinProvider, FeedbackFinToken } from './feedback/feedbackfin.token';
import { IMenuItem, menuRoutes, MenuType } from './pages/menu.routes';
import { PermissionController } from './services/permission.controller';
import { NgcCookieConsentService } from "ngx-cookieconsent";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public menuRoutes: IMenuItem[] = menuRoutes;

  public mobileMenuOpen = false;

  constructor(
    private readonly permissionController: PermissionController,
    private readonly ccService: NgcCookieConsentService,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(FeedbackFinToken) private readonly feedbackFin: FeedbackfinProvider,
    @Inject(LITTILCONFIG) private readonly littilConfig: LittilConfig,
  ) {
  }

  public ngOnInit(): void {
    this.feedbackFin.config.url = this.littilConfig.apiHost + '/api/v1/feedback';
    this.feedbackFin.config.mode = 'form';

    (this.document.defaultView as any).feedbackfin = this.feedbackFin;

    this.permissionController.onPermissionChange.subscribe(() => {
      const adminPages: IMenuItem[] = menuRoutes.filter(
        (route) => route.type === MenuType.Admin
      );
      adminPages.forEach((item: IMenuItem) => {
        item.disabled = !this.permissionController.loggedIn;
      });
    });
  }

  public toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  public hideMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
