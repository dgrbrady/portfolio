import { WindowCommand } from './window-command';
import { WindowConfig } from '../../types/window';

import { WindowService } from '../../services/window.service';

export class OpenWindowCommand extends WindowCommand {
  constructor(
    private windowService: WindowService,
    private config: WindowConfig
  ) {
    super();
  }

  execute(): void {
    this.windowService.open(this.config);
  }
}
