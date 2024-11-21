import {Component, OnInit} from '@angular/core';
import {LittilUserService} from "../../../services/littil-user/littil-user.service";
import {UserDTO} from "../../../api/generated";
import {catchError, Observable} from "rxjs";

@Component({
  selector: 'littil-admin-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users$!: Observable<UserDTO[]>;

  constructor(private userService: LittilUserService) {
  }

  ngOnInit(): void {
   this.users$ = this.userService.getAll().pipe(
      catchError(async (error) => {
        console.error('Error fetching users', error);
        return  (new Array<UserDTO>); // Return an empty array to keep the Observable stream alive
      })
    );
 }

}
