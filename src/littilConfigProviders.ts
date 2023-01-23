import { StaticProvider } from '@angular/core';
import { BASE_PATH } from './app/api/generated';
import { getLittilConfigFromWindow, LITTILCONFIG } from './littilConfig';

export const getLittilConfigProviders = (): StaticProvider[] => {
  const config = getLittilConfigFromWindow();

  return [
    {
      provide: LITTILCONFIG,
      useValue: config,
    },
    {
      provide: BASE_PATH,
      useValue: config.apiHost,
    },
  ];
};
