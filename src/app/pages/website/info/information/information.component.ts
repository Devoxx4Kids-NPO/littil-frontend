import { Component } from '@angular/core';
import { ContentContainerComponent } from '../../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { TitleComponent } from '../../../../components/title/title.component';

@Component({
  selector: 'littil-info',
  templateUrl: './information.component.html',
  standalone: true,
  imports: [TitleComponent, ContentContainerComponent, FooterComponent],
})
export class InformationComponent {}
