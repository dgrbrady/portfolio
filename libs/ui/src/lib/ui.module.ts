import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoadingComponent } from './loading/loading.component';
import { MenuComponent } from './menu/menu.component';
import { WindowComponent } from './window/window.component';
import { WindowHostDirective } from './window-host.directive';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { WindowService } from './types';

@NgModule({
  imports: [CommonModule, DragDropModule, OverlayModule],
  providers: [WindowService],
  declarations: [
    LoadingComponent,
    MenuComponent,
    WindowComponent,
    WindowHostDirective,
    TaskbarComponent,
  ],
  exports: [
    LoadingComponent,
    MenuComponent,
    WindowComponent,
    WindowHostDirective,
    TaskbarComponent,
  ],
})
export class UiModule {}
