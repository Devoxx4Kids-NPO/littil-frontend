import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiV1UsersUserGet201Response, ChangeEmailResource, EmailVerficationCodeResource,
  User,
  UsersService,
  UserStatistics
} from "../../api/generated";
import { HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class LittilUserService {

  constructor(private userService: UsersService) {}

  getById(id: string): Observable<User> {
    return this.userService.apiV2UsersIdGet(id);
  }

  getAll(): Observable<User[]> {
    return this.userService.apiV2UsersGet();
  }

  create(user: User): Observable<ApiV1UsersUserGet201Response> {
    return this.userService.apiV2UsersPost(user);
  }

  delete(id: string): Observable<any> {
    return this.userService.apiV2UsersIdDelete(id);
  }

  getUserStatistics(): Observable<UserStatistics[]> {
    return this.userService.apiV2UsersStatisticsGet();
  }

  emailVerificationCode(id: string,
            emailVerificationCodeResource: EmailVerficationCodeResource): Observable<HttpResponse<any>>  {
    return this.userService.apiV2UsersIdEmailChangeRequestPost(id,
      emailVerificationCodeResource,'response');
  }

  changeEmail(id: string, changeEmailResource: ChangeEmailResource): Observable<HttpResponse<any>> {
    return this.userService.apiV2UsersIdEmailChangeVerifyPatch(id,changeEmailResource, 'response');
  }

}
