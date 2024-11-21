import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { TitleComponent } from '../../../components/title/title.component';

@Component({
  selector: 'littil-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  standalone: true,
  imports: [CommonModule, ContentContainerComponent, TitleComponent, FooterComponent],
})
export class PrivacyPolicyComponent {}
