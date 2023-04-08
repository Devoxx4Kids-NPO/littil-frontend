import {
  MockedResponse,
  ResponseFunction,
  RestContext,
  RestRequest,
  rest,
} from 'msw';
import { firstValueFrom } from 'rxjs';
import { School } from '../../generated';
import { MockSchoolService } from '../school.service.mock';
import { MockConfigEndpoint } from './config';
import { MockHandlers } from './mock.handler';

export class MockHandlersSchools extends MockHandlers {
  constructor(config: MockConfigEndpoint) {
    super(config);
    this.addHandler(
      rest.get(`${config.base_url}`, this.getAllSchoolsHandler())
    );
    this.addHandler(rest.get(`${config.base_url}/*`, this.getSchoolHandler()));
    this.addHandler(
      rest.put(`${config.base_url}`, this.createOrUpdateSchoolHandler())
    );
    this.addHandler(
      rest.delete(`${config.base_url}/*`, this.deleteSchoolHandler())
    );
  }

  public getAllSchoolsHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<School[]> | undefined> => {
      const data = await firstValueFrom(
        new MockSchoolService().apiV1SchoolsGet()
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }

  public getSchoolHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<School> | undefined> => {
      let data = undefined;
      if ((req.params[0] as string).match('9beae92a')) {
        data = await firstValueFrom(
          new MockSchoolService().apiV1SchoolsIdGet(req.params[0] as string)
        );
        if (!data) return this.response404(res, ctx);
      } else if ((req.params[0] as string).match('Schoolname')) {
        data = await firstValueFrom(
          new MockSchoolService().apiV1SchoolsNameNameGet(
            req.params[0] as string
          )
        );
      }
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }

  public createOrUpdateSchoolHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<School> | undefined> => {
      const data = await firstValueFrom(
        new MockSchoolService().apiV1SchoolsPut()
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }

  public deleteSchoolHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<any> | undefined> => {
      const data = await firstValueFrom(
        new MockSchoolService().apiV1SchoolsIdDelete(req.params[0] as string)
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }
}
