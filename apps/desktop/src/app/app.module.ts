import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UiModule } from '@dgrbrady/ui';
import { DataModule } from '@dgrbrady/data';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiModule, DataModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
