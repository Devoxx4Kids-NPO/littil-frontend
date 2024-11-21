import { Component } from '@angular/core';
import { ContactBannerComponent } from '../../../../components/contact-banner/contact-banner.component';
import { ContentContainerComponent } from '../../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { TitleComponent } from '../../../../components/title/title.component';

@Component({
  selector: 'littil-schools',
  templateUrl: './schools.component.html',
  standalone: true,
  imports: [TitleComponent, ContentContainerComponent, ContactBannerComponent, FooterComponent],
})
export class SchoolsComponent {}
