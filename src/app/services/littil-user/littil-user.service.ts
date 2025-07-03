import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiV1UsersUserGet201Response,
  User,
  UsersService,
  UserStatistics,
} from '../../api/generated';

@Injectable({
  providedIn: 'root',
})
export class LittilUserService {
  constructor(private userService: UsersService) {}

  getById(id: string): Observable<User> {
    return this.userService.apiV1UsersUserIdGet(id);
  }

  getAll(): Observable<User[]> {
    return this.userService.apiV1UsersUserGet();
  }

  create(user: User): Observable<ApiV1UsersUserGet201Response> {
    return this.userService.apiV1UsersUserPost(user);
  }

  delete(id: string): Observable<any> {
    return this.userService.apiV1UsersUserIdDelete(id);
  }

  getUserStatistics(): Observable<UserStatistics[]> {
    return this.userService.apiV1UsersStatisticsGet();
  }

}
