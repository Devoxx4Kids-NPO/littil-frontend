import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'littil-sponsor-aramco-europe',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './sponsor-aramco-europe.component.html',
  styleUrl: './sponsor-aramco-europe.component.scss'
})
export class SponsorAramcoEuropeComponent {
  expanded = false;
}
