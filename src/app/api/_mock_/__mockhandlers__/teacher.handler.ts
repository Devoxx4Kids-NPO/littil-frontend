import {
  MockedResponse,
  ResponseFunction,
  RestContext,
  RestRequest,
  rest,
} from 'msw';
import { firstValueFrom } from 'rxjs';
import {
  ApiV1GuestTeachersGet200Response,
  GuestTeacher,
} from '../../generated';
import { MockTeacherService } from '../teacher.service.mock';
import { MockConfigEndpoint } from './config';
import { MockHandlers } from './mock.handler';

export class MockHandlersTeachers extends MockHandlers {
  constructor(config: MockConfigEndpoint) {
    super(config);
    this.addHandler(
      rest.get(`${config.base_url}`, this.getAllTeachersHandler())
    );
    this.addHandler(
      rest.get(`${config.base_url}/*`, this.getTeacherByIdHandler())
    );
    this.addHandler(
      rest.put(`${config.base_url}`, this.createOrUpdateTeacherHandler())
    );
    this.addHandler(
      rest.delete(`${config.base_url}/*`, this.deleteTeacherHandler())
    );
  }

  public getAllTeachersHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<GuestTeacher[]> | undefined> => {
      const data = await firstValueFrom(
        new MockTeacherService().apiV1GuestTeachersGet()
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }

  public getTeacherByIdHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<GuestTeacher> | undefined> => {
      const data = await firstValueFrom(
        new MockTeacherService().apiV1GuestTeachersIdGet(
          req.params[0] as string
        )
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }

  public createOrUpdateTeacherHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<
      MockedResponse<ApiV1GuestTeachersGet200Response> | undefined
    > => {
      const data = await firstValueFrom(
        new MockTeacherService().apiV1GuestTeachersPut()
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }

  public deleteTeacherHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<any> | undefined> => {
      const data = await firstValueFrom(
        new MockTeacherService().apiV1GuestTeachersIdDelete(
          req.params[0] as string
        )
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }
}
