import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { WindowHostDirective } from '../window-host.directive';
import { WindowConfig, WindowService, WindowSize } from '@dgrbrady/ui';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'dgrbrady-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WindowComponent<T = unknown> implements OnInit, AfterViewInit {
  @Input() config: WindowConfig<T>;
  @Input() overlayRef: OverlayRef;
  @Input() index: number;
  @Input() portal: ComponentPortal<WindowComponent<T>>;
  @ViewChild(WindowHostDirective, { static: true })
  windowHost: WindowHostDirective;
  windowService: WindowService;
  state: 'maximized' | 'minimized' | 'normal' = 'normal';
  size: WindowSize;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private componentFactoryResolver: ComponentFactoryResolver,
    private overlay: Overlay,
    private vcRef: ViewContainerRef,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.captureCurrentSize();
  }

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent(): void {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        this.config.component
      );
    const vcRef = this.windowHost.vcRef;
    vcRef.clear();

    const componentRef = vcRef.createComponent(componentFactory);
    Object.entries(this.config.inputs).forEach(
      ([key, value]) => (componentRef.instance[key] = value)
    );
  }

  close() {
    this.vcRef.clear();
    this.overlayRef.dispose();
    this.windowService.closeWindow(this.index);
  }

  maximize() {
    if (this.state !== 'normal') {
      this.state = 'normal';
      const position = this.overlay
        .position()
        .flexibleConnectedTo(this.document.body)
        .withPositions([
          {
            originX: 'center',
            originY: 'center',
            overlayX: 'center',
            overlayY: 'center',
          },
        ]);
      this.overlayRef.updatePositionStrategy(position);
      this.overlayRef.updateSize({
        width: this.size.width,
        height: this.size.height,
      });
    } else {
      this.state = 'maximized';
      this.overlayRef.updateSize({ width: '100%', height: '100vh' });
      const position = this.overlay
        .position()
        .flexibleConnectedTo(this.document.body)
        .withPositions([
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
          },
        ]);
      this.overlayRef.updatePositionStrategy(position);
    }
    this.cdRef.detectChanges();
  }

  minimize() {
    this.windowService.minimizeWindow(this);
    this.vcRef.clear();
    this.overlayRef.detach();
  }

  captureCurrentSize(): void {
    const width = this.overlayRef.overlayElement.offsetWidth;
    const height = this.overlayRef.overlayElement.offsetHeight;
    this.size = { width, height };
  }
}
