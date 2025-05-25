import { Component } from '@angular/core';
import { catchError, Observable } from "rxjs";
import { UserStatistics } from "../../../api/generated";
import { LittilUserService } from "../../../services/littil-user/littil-user.service";
import {
  ContentContainerComponent
} from "../../../components/content-container/content-container.component";
import { TitleComponent } from "../../../components/title/title.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "littil-admin",
  templateUrl: "./admin.component.html",
  standalone: true,
  imports: [
    CommonModule,
    ContentContainerComponent,
    TitleComponent
  ]
})
export class AdminComponent {
  usersStatitics$!: Observable<UserStatistics[]>;

  constructor(private userService: LittilUserService) {
  }

  ngOnInit(): void {
    this.usersStatitics$ = this.userService.getUserStatistics().pipe(
      catchError(async (error) => {
        console.error('Error fetching users', error);
        // Return an empty array to keep the Observable stream alive
        return  (new Array<UserStatistics>);
      })
    );
  }
}
