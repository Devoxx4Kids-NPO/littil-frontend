import {Component} from '@angular/core';
// import {catchError, Observable} from "rxjs";
// import {User, UserStatistics} from "../../../api/generated";
import {LittilUserService} from "../../../services/littil-user/littil-user.service";

@Component({
  selector: 'littil-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  // usersStatitics$!: Observable<UserStatistics[]>;

  constructor(private userService: LittilUserService) {
  }

  ngOnInit(): void {
    // this.usersStatitics$ = this.userService.userStatistics().pipe(
    //   catchError(async (error) => {
    //     console.error('Error fetching users', error);
    //     return  (new Array<UserStatistics>); // Return an empty array to keep the Observable stream alive
    //   })
    // );
  }
}
