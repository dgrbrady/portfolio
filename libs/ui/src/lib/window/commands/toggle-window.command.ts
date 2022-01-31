import { WindowCommand } from './window-command';
import { WindowComponent } from '../window.component';

export class ToggleWindowCommand extends WindowCommand {
  constructor(private windowRef: WindowComponent) {
    super();
  }

  execute(): void {
    if (this.windowRef.state === 'minimized') {
      this.windowRef.maximize();
    } else {
      this.windowRef.minimize();
    }
  }
}
