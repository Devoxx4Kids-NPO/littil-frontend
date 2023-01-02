import { InjectionToken } from '@angular/core';

export const LITTILCONFIG: InjectionToken<LittilConfig> = new InjectionToken('LittilConfig');

export interface LittilConfig {
  apiHost: string;
  auth0Domain: string;
  auth0ClientId: string;
  auth0Audience: string;
}

export const isLittilConfig = (input: unknown): input is LittilConfig =>
  typeof (input as LittilConfig)?.apiHost === 'string'
  && typeof (input as LittilConfig)?.auth0Domain === 'string'
  && typeof (input as LittilConfig)?.auth0ClientId === 'string'
  && typeof (input as LittilConfig)?.auth0Audience === 'string';

export const getLittilConfigFromWindow = (): LittilConfig => {
  const externalConfig = (window as any).littilConfig;
  if (!isLittilConfig(externalConfig)) {
    throw new Error('No valid external config found; ' + JSON.stringify(externalConfig));
  }
  return externalConfig;
};
