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
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const WINDOW_OPEN_TIMING = '200ms ease-in';
const WINDOW_CLOSE_TIMING = '150ms ease-out';
const WINDOW_MINIMIZED_TIMING = '175ms ease-out';

@Component({
  selector: 'dgrbrady-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state(
        'open',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'minimized',
        style({
          transform: 'scale(0)',
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(100%)',
        })
      ),
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: '0%' }),
        animate(
          WINDOW_OPEN_TIMING,
          style({ transform: 'translateY(0)', opacity: '100%' })
        ),
      ]),

      transition('* => open', [animate(WINDOW_OPEN_TIMING)]),
      transition('* => closed', [animate(WINDOW_CLOSE_TIMING)]),
      transition('open => minimized', [animate(WINDOW_MINIMIZED_TIMING)]),
    ]),
  ],
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
    this.state = undefined;
    this.cdRef.detectChanges();
    this.windowService.close(this);
    this.vcRef.clear();
    setTimeout(() => this.overlayRef.dispose(), 75);
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
    this.overlayRef.removePanelClass('minimized');
    this.cdRef.detectChanges();
  }

  minimize() {
    this.state = 'minimized';
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.overlayRef.addPanelClass('minimized');
    }, 75);
  }

  captureCurrentSize(): void {
    const width = this.overlayRef.overlayElement.offsetWidth;
    const height = this.overlayRef.overlayElement.offsetHeight;
    this.size = { width, height };
  }
}
