import { BehaviorSubject } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { TaskbarComponent, WindowComponent, WindowConfig } from '../types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  private windowsSubject = new BehaviorSubject<
    ComponentRef<WindowComponent<unknown>>[]
  >([]);
  private windows: ComponentRef<WindowComponent<unknown>>[] = [];

  defaultWindowConfig: Partial<WindowConfig> = {
    multiple: false,
    title: 'Untitled Window',
    inputs: {},
  };
  taskbar: TaskbarComponent;
  windows$ = this.windowsSubject
    .asObservable()
    .pipe(map((windows) => windows.map((win) => win.instance)));

  constructor(private overlay: Overlay) {}

  close(windowRef: WindowComponent) {
    this.windows.splice(windowRef.index, 1);
    this.windowsSubject.next(this.windows);
  }

  open<T>(config?: WindowConfig<T>): void {
    // merge passed in config with default config
    config = { ...this.defaultWindowConfig, ...config };
    const windowRef = this.configureWindowInstance(config);
    this.windows.push(windowRef);
    this.windowsSubject.next(this.windows);
  }

  private configureWindowInstance(config: WindowConfig) {
    const windowPortal = new ComponentPortal(WindowComponent);
    const overlayRef = this.createOverlayRef();
    const windowRef = overlayRef.attach(windowPortal);
    windowRef.instance.config = config;
    windowRef.instance.overlayRef = overlayRef;
    windowRef.instance.portal = windowPortal;
    windowRef.instance.index = this.windows.length;
    windowRef.instance.windowService = this;
    return windowRef;
  }

  private createOverlayRef() {
    return this.overlay.create({
      panelClass: 'window-pane',
    });
  }
}
