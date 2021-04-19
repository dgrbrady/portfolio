import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoadingComponent } from './loading/loading.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [CommonModule, DragDropModule, OverlayModule],
  declarations: [LoadingComponent, MenuComponent],
  exports: [LoadingComponent, MenuComponent]
})
export class UiModule {}
