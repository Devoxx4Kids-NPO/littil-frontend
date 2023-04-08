import {
  MockedResponse,
  ResponseFunction,
  RestContext,
  RestHandler,
} from 'msw';
import { MockConfigEndpoint } from './config';

export class MockHandlers {
  private _handlers: RestHandler[] = [];

  public get handlers(): RestHandler[] {
    return this._handlers;
  }

  constructor(private readonly config: MockConfigEndpoint) {}

  public addHandler(restHandler: RestHandler): void {
    console.log(
      `MOCK LOADED${
        (this.config.delay && ` (DELAY ${this.config.delay})`) || ''
      }:`,
      restHandler.info.header
    );
    this._handlers.push(restHandler);
  }

  public response404(
    res: ResponseFunction,
    ctx: RestContext
  ): MockedResponse<any> | Promise<MockedResponse<any>> {
    return res(
      ctx.status(404),
      ctx.json({ errorMessage: `Request has no mock.` })
    );
  }

  public response200(
    res: ResponseFunction,
    ctx: RestContext,
    data: unknown
  ): MockedResponse<any> | Promise<MockedResponse<any>> {
    return res(ctx.delay(this.config.delay), ctx.json(data));
  }
}
