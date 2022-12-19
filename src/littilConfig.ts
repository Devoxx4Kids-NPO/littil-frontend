import { InjectionToken } from '@angular/core';

export const LITTILCONFIG: InjectionToken<LittilConfig> = new InjectionToken('LittilConfig');

export interface LittilConfig {
  apiHost: string;
}

export const isLittilConfig = (input: unknown): input is LittilConfig =>
  typeof (input as LittilConfig)?.apiHost === 'string';
