import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UiModule } from '@dgrbrady/ui';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
