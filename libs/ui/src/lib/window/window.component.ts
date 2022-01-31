import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { WindowConfig, WindowSize } from '../types/window';
import { WindowHostDirective } from '../window-host.directive';
import { WindowService } from '../services/window.service';

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
    const vcRef = this.windowHost.vcRef;
    vcRef.clear();

    const componentRef = vcRef.createComponent(this.config.component);
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
      this.overlayRef.updateSize({
        width: '100%',
        // 74px is window header height + app taskbar height
        height: 'calc(100% - 74px)',
      });
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
