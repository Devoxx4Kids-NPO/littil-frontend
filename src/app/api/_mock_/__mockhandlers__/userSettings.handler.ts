import {
  MockedResponse,
  ResponseFunction,
  RestContext,
  RestRequest,
  rest,
} from 'msw';
import { firstValueFrom } from 'rxjs';
import { ApiV1UsersUserGet201Response, UserSetting } from '../../generated';
import { MockUserSettingsService } from '../userSettings.service.mock';
import { MockConfigEndpoint } from './config';
import { MockHandlers } from './mock.handler';

export class MockHandlersUserSettings extends MockHandlers {
  constructor(config: MockConfigEndpoint) {
    super(config);
    this.addHandler(
      rest.get(`${config.base_url}`, this.getUserSettingsHandler())
    );
    this.addHandler(
      rest.post(`${config.base_url}`, this.createUserSettingsHandler())
    );
    this.addHandler(
      rest.put(`${config.base_url}/*`, this.updateUserSettingsHandler())
    );
    this.addHandler(
      rest.get(`${config.base_url}/*`, this.getUserSettingsByIdHandler())
    );
    this.addHandler(
      rest.delete(`${config.base_url}/*`, this.deleteUserSettingsHandler())
    );
  }

  public getUserSettingsHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<UserSetting[]> | undefined> => {
      const data = await firstValueFrom(
        new MockUserSettingsService().apiV1UserSettingsGet()
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }

  public getUserSettingsByIdHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<ApiV1UsersUserGet201Response> | undefined> => {
      const data = await firstValueFrom(
        new MockUserSettingsService().apiV1UserSettingsKeyGet(
          req.params[0] as string
        )
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }

  public updateUserSettingsHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<ApiV1UsersUserGet201Response> | undefined> => {
      const data = await firstValueFrom(
        new MockUserSettingsService().apiV1UserSettingsKeyPut(
          req.params[0] as string
        )
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }

  public createUserSettingsHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<ApiV1UsersUserGet201Response> | undefined> => {
      const data = await firstValueFrom(
        new MockUserSettingsService().apiV1UserSettingsPost()
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }

  public deleteUserSettingsHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<any> | undefined> => {
      const data = await firstValueFrom(
        new MockUserSettingsService().apiV1UserSettingsKeyDelete(
          req.params[0] as string
        )
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }
}
