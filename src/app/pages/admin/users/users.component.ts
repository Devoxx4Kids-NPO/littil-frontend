import {Component, OnInit} from '@angular/core';
import {LittilUserService} from "../../../services/littil-user/littil-user.service";
import {User} from "../../../api/generated";
import {catchError, Observable} from "rxjs";

@Component({
  selector: 'littil-admin-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users$!: Observable<User[]>;

  constructor(private userService: LittilUserService) {
  }

  ngOnInit(): void {
   console.log("Fetching users...");
   this.users$ = this.userService.getAll().pipe(
      catchError(async (error) => {
        console.error('Error fetching users', error);
        return  (new Array<User>); // Return an empty array to keep the Observable stream alive
      })
    );
 }

}
