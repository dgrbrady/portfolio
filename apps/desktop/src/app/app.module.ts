import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataModule } from '@dgrbrady/data';
import { UiModule } from '@dgrbrady/ui';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiModule, DataModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
