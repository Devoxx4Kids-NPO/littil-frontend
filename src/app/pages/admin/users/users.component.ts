import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {catchError, Observable} from 'rxjs';
import {User} from '../../../api/generated';
import {
  ContentContainerComponent
} from '../../../components/content-container/content-container.component';
import {TitleComponent} from '../../../components/title/title.component';
import {LittilUserService} from '../../../services/littil-user/littil-user.service';

@Component({
  selector: 'littil-admin-users',
  templateUrl: './users.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ContentContainerComponent,
    TitleComponent,
  ]
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private userService: LittilUserService) {}

  ngOnInit(): void {
    this.users$ =this.userService.getAll().pipe(
      catchError(async error => {
        console.error('Error fetching users', error);
        // Return an empty array to keep the Observable stream alive
        return new Array<User>();
      })
    );

  }
}
