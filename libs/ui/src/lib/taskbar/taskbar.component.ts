import { BrowserComponent } from '../browser/browser.component';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  LoadingComponent,
  MenuItem,
  WindowComponent,
  WindowService,
} from '../types';

@Component({
  selector: 'dgrbrady-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskbarComponent {
  @Input() windows: WindowComponent[] = [];
  startMenuOpened = false;
  startMenuItems: MenuItem[] = [
    {
      text: 'About',
      onClick: () =>
        this.windowService.open({
          title: 'About',
          component: LoadingComponent,
        }),
    },
    {
      text: 'Programs',
      menuItems: [
        {
          text: 'Browser',
          onClick: () =>
            this.windowService.open({
              title: 'Browser',
              component: BrowserComponent,
            }),
        },
      ],
    },
    {
      text: 'Projects',
      menuItems: [
        {
          text: 'GTFO',
          onClick: () =>
            this.windowService.open({
              component: BrowserComponent,
              title: 'Browser',
              inputs: { url: 'https://gtfo.dgrbrady.dev' },
            }),
        },
        {
          text: 'PM-UI',
          onClick: () =>
            this.windowService.open({
              component: BrowserComponent,
              title: 'Browser',
              inputs: { url: 'https://pm-ui.dgrbrady.dev' },
            }),
        },
      ],
    },
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private windowService: WindowService,
    private cdRef: ChangeDetectorRef
  ) {}

  addWindow(windowRef: WindowComponent): void {
    this.windows.push(windowRef);
    this.cdRef.detectChanges();
  }

  formatWindowTitle(windowTitle: string): string {
    if (windowTitle === undefined) {
      return;
    }

    return windowTitle.length < 12
      ? windowTitle
      : `${windowTitle.slice(0, 12)}...`;
  }

  openStartMenu(): void {
    this.startMenuOpened = !this.startMenuOpened;
  }

  maximizeWindow(windowRef: WindowComponent): void {
    // find the index of the incoming WindowComponent
    const windowIndex = this.windows.findIndex(
      (taskbarWindowRef) => taskbarWindowRef === windowRef
    );

    // and if it's found, remove from the taskbar managed windows
    if (windowIndex > -1) {
      this.windows.splice(windowIndex, 1);
      windowRef.windowService.maximizeWindow(windowIndex);
      this.cdRef.detectChanges();
    }
  }
}
