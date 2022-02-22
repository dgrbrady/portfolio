// import { enableProdMode } from '@angular/core';
import '@angular/compiler';
import { UiModule } from './lib/ui.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
/* import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
} */

platformBrowserDynamic()
  .bootstrapModule(UiModule)
  .catch((err) => console.error(err));
