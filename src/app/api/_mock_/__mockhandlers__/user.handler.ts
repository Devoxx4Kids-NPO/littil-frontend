import {
  MockedResponse,
  ResponseFunction,
  RestContext,
  RestRequest,
  rest,
} from 'msw';
import { firstValueFrom } from 'rxjs';
import { ApiV1UsersUserGet201Response, User } from '../../generated';
import { MockUserService } from '../user.service.mock';
import { MockConfigEndpoint } from './config';
import { MockHandlers } from './mock.handler';

export class MockHandlersUser extends MockHandlers {
  constructor(config: MockConfigEndpoint) {
    super(config);
    this.addHandler(
      rest.get(`${config.base_url}/user`, this.getUsersHandler())
    );
    this.addHandler(
      rest.get(`${config.base_url}/user/*`, this.getUserByIdHandler())
    );
    this.addHandler(
      rest.post(`${config.base_url}/user`, this.createUserHandler())
    );
    this.addHandler(
      rest.delete(`${config.base_url}/user/*`, this.deleteUserHandler())
    );
  }

  public getUsersHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<User[]> | undefined> => {
      const data = await firstValueFrom(
        new MockUserService().apiV1UsersUserGet()
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }

  public getUserByIdHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<ApiV1UsersUserGet201Response> | undefined> => {
      const data = await firstValueFrom(
        new MockUserService().apiV1UsersUserIdGet(req.params[0] as string)
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }

  public createUserHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<ApiV1UsersUserGet201Response> | undefined> => {
      const data = await firstValueFrom(
        new MockUserService().apiV1UsersUserPost()
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }

  public deleteUserHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<any> | undefined> => {
      const data = await firstValueFrom(
        new MockUserService().apiV1UsersUserIdDelete(req.params[0] as string)
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }
}
