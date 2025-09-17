import { Component } from '@angular/core';
import { ContactBannerComponent } from '../../../../components/contact-banner/contact-banner.component';
import { ContentContainerComponent } from '../../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { TitleComponent } from '../../../../components/title/title.component';
import {
  SponsorAramcoEuropeComponent
} from "./sponsor-aramco-europe/sponsor-aramco-europe.component";
import {
  SponsorInfoSupportComponent
} from "./sponsor-info-support/sponsor-info-support.component";

@Component({
  selector: 'littil-sponsors',
  templateUrl: './sponsors.component.html',
  standalone: true,
  imports: [
	  TitleComponent, 
	  ContentContainerComponent, 
	  ContactBannerComponent, 
	  FooterComponent, 
	  SponsorAramcoEuropeComponent,
	  SponsorInfoSupportComponent,
	  ],
})
export class SponsorsComponent {}
