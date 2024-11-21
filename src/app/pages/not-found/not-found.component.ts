import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'littil-not-found',
  templateUrl: './not-found.component.html',
  standalone: true,
  imports: [FooterComponent, RouterModule],
})
export class NotFoundComponent {}
