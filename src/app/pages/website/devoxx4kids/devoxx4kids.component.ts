import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { TitleComponent } from '../../../components/title/title.component';

@Component({
  selector: 'littil-devoxx4kids',
  templateUrl: './devoxx4kids.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ContentContainerComponent,
    TitleComponent,
    FooterComponent,
    ButtonComponent,
  ],
})
export class Devoxx4kidsComponent {
  navToDevoxx(): void {
    window.open('https://www.devoxx4kids.org/nederland/', '_blank');
  }
}
