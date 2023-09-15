import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'redirect',
  template: 'redirecting...'
})
export class BlogComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    window.location.href = 'https://www.devoxx4kids.org/nederland/'
  }
}
