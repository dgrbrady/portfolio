import { BrowserComponent } from './browser/browser.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { WindowComponent } from './window/window.component';
import { WindowHostDirective } from './window-host.directive';
import { WindowService } from './types';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    OverlayModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [WindowService],
  declarations: [
    LoadingComponent,
    MenuComponent,
    WindowComponent,
    WindowHostDirective,
    TaskbarComponent,
    BrowserComponent,
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
