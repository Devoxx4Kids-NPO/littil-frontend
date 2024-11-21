import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { TitleComponent } from '../../../components/title/title.component';

@Component({
  selector: 'redirect',
  templateUrl: './blog.component.html',
  standalone: true,
  imports: [CommonModule, ContentContainerComponent, TitleComponent],
})
export class BlogComponent implements OnInit {
  ngOnInit() {
    window.location.href = 'https://www.devoxx4kids.org/nederland/';
  }
}
