import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'littil-profile-container',
  templateUrl: './profile-container.component.html'
})
export class ProfileContainerComponent implements OnInit {
  @Input() title?: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
