import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { TaskbarComponent, WindowComponent, WindowConfig } from '../types';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  defaultWindowConfig: Partial<WindowConfig> = {
    multiple: false,
    title: 'Untitled Window',
    inputs: {},
  };
  taskbar: TaskbarComponent;
  windows: ComponentRef<WindowComponent<unknown>>[] = [];

  constructor(private overlay: Overlay) {}

  closeWindow(windowIndex: number): void {
    this.windows.splice(windowIndex, 1);
  }

  open<T>(config?: WindowConfig<T>): void {
    // merge passed in config with default config
    config = { ...this.defaultWindowConfig, ...config };
    const windowPortal = new ComponentPortal(WindowComponent);
    const overlayRef = this.overlay.create({
      panelClass: 'window-pane',
    });
    const windowRef = overlayRef.attach(windowPortal);
    windowRef.instance.config = config;
    windowRef.instance.overlayRef = overlayRef;
    windowRef.instance.portal = windowPortal;
    windowRef.instance.index = this.windows.length;
    windowRef.instance.windowService = this;

    this.windows.push(windowRef);
  }

  maximizeWindow(windowIndex: number): void {
    const windowRef = this.windows.splice(windowIndex, 1).pop();
    this.open(windowRef.instance.config);
  }

  minimizeWindow(windowRef: WindowComponent): void {
    this.taskbar.addWindow(windowRef);
  }

  registerTaskbar(taskbar: TaskbarComponent): void {
    this.taskbar = taskbar;
  }
}
