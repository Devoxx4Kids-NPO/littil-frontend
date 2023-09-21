import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'redirect',
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  ngOnInit() {
    window.location.href = 'https://www.devoxx4kids.org/nederland/';
  }
}
