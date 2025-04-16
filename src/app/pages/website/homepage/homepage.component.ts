import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'littil-homepage',
  templateUrl: './homepage.component.html',
  standalone: true,
  imports: [CommonModule, ContentContainerComponent, FooterComponent, RouterModule],
})
export class HomepageComponent {}
