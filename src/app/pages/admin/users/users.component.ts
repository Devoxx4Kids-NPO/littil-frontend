import {Component, OnInit} from '@angular/core';
import {LittilUserService} from "../../../services/littil-user/littil-user.service";
import {User} from "../../../api/generated";

@Component({
  selector: 'littil-admin-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: LittilUserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }

}
