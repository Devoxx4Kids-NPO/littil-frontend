import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  // ApiV1UsersUserGet201Response,
  User,
  UserDTO,
  UsersService,
  // UserStatistics,
} from '../../api/generated';

@Injectable({
  providedIn: 'root',
})
export class LittilUserService {
  constructor(private userService: UsersService) {}

  getById(id: string): Observable<User> {
    return this.userService.apiV1UsersUserIdGet(id);
  }

  getAll(): Observable<UserDTO[]> {
    return this.userService.apiV1UsersUserGet();
  }

  create(user: User): Observable<User> {
    return this.userService.apiV1UsersUserPost(user);
  }

  delete(id: string): Observable<any> {
    return this.userService.apiV1UsersUserIdDelete(id);
  }

  // userStatistics(): Observable<UserStatistics[]> {
  //   return this.userService.apiV1UsersCountGet();
  // }

}
