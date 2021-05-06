import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { WindowService, TaskbarComponent } from '@dgrbrady/ui';

@Component({
  selector: 'dgrbrady-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(TaskbarComponent) taskbar: TaskbarComponent;
  title = 'desktop';

  constructor(private windowService: WindowService) {}

  ngAfterViewInit(): void {
    this.windowService.registerTaskbar(this.taskbar);
  }
}
