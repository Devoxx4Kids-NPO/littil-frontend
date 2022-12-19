import { StaticProvider } from '@angular/core';
import { BASE_PATH } from './app/api/generated';
import { isLittilConfig, LITTILCONFIG } from './littilConfig';

export const getLittilConfigProviders = (): StaticProvider[] => {
  const externalConfig = (window as any).littilConfig;
  if (!isLittilConfig(externalConfig)) {
    console.warn('No valid external config found; ' + JSON.stringify(externalConfig));
    return [];
  }

  return [
    {
      provide: LITTILCONFIG,
      useValue: externalConfig,
    },
    {
      provide: BASE_PATH,
      useValue: externalConfig.apiHost,
    },
  ];
};
