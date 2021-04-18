import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    LoadingComponent,
    MenuComponent
  ],
  exports: [
    LoadingComponent,
    MenuComponent
  ],
})
export class UiModule {}
