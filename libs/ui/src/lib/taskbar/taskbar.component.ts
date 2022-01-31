import { AboutComponent } from '../about/about.component';
import { BrowserComponent } from '../browser/browser.component';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem, WindowComponent, WindowService } from '../types';
import { OpenWindowCommand } from '../window/commands/open-window.command';
import { ToggleWindowCommand } from '../window/commands/toggle-window.command';

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
      text: 'About.txt',
      onClick: () =>
        new OpenWindowCommand(this.windowService, {
          title: 'About.txt',
          component: AboutComponent,
        }).execute(),
    },
    {
      text: 'Programs',
      menuItems: [
        {
          text: 'Browser.exe',
          onClick: () =>
            new OpenWindowCommand(this.windowService, {
              title: 'Browser',
              component: BrowserComponent,
            }).execute(),
        },
      ],
    },
    {
      text: 'Projects',
      menuItems: [
        {
          text: 'GTFO.exe',
          onClick: () =>
            new OpenWindowCommand(this.windowService, {
              component: BrowserComponent,
              title: 'GTFO',
              inputs: { url: 'https://gtfo.dgrbrady.dev' },
            }).execute(),
        },
        {
          text: 'PM-UI.exe',
          onClick: () =>
            new OpenWindowCommand(this.windowService, {
              component: BrowserComponent,
              title: 'PM-UI',
              inputs: { url: 'https://pm-ui.dgrbrady.dev' },
            }).execute(),
        },
      ],
    },
  ];

  windows$ = this.windowService.windows$;

  constructor(private windowService: WindowService) {}

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

  toggleWindow(windowRef: WindowComponent) {
    new ToggleWindowCommand(windowRef).execute();
  }
}
