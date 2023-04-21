import {
  MockedResponse,
  ResponseFunction,
  RestContext,
  RestRequest,
  rest,
} from 'msw';
import { firstValueFrom } from 'rxjs';
import { SearchResult } from '../../generated';
import { MockSearchService } from '../search.service.mock';
import { MockConfigEndpoint } from './config';
import { MockHandlers } from './mock.handler';

export class MockHandlersSearch extends MockHandlers {
  constructor(config: MockConfigEndpoint) {
    super(config);
    this.addHandler(rest.get(`${config.base_url}`, this.getSearchHandler()));
  }

  public getSearchHandler() {
    return async (
      req: RestRequest,
      res: ResponseFunction,
      ctx: RestContext
    ): Promise<MockedResponse<SearchResult[]> | undefined> => {
      const data = await firstValueFrom(
        new MockSearchService().apiV1SearchGet()
      );
      if (!data) return this.response404(res, ctx);
      return this.response200(res, ctx, data);
    };
  }
}
