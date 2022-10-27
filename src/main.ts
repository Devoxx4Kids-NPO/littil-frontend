import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { isLittilConfig, LITTILCONFIG } from './littilConfig';

if (environment.production) {
  enableProdMode();
}

const externalConfig = (window as any).littilConfig;
if (!isLittilConfig(externalConfig)) {
  console.warn('No valid external config found; ' + JSON.stringify(externalConfig));
}

const providers = [
  {
    provide: LITTILCONFIG,
    useValue: externalConfig,
  },
];

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
