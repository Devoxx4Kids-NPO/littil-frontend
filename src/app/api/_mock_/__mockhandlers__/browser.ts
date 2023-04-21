import { setupWorker } from 'msw';
import { MockConfig } from './config';
import { getHandlers } from '.';

export const enableMocking = (config: MockConfig): void => {
  const handlers = getHandlers(config);
  if (handlers) {
    setupWorker(...handlers).start({
      onUnhandledRequest: 'bypass', // bypass
    });
  } else {
    throw new Error('Could not load handlers');
  }
};
