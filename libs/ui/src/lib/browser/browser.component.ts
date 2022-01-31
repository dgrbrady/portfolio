import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { BrowserHistoryService } from './browser-history.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'dgrbrady-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss'],
  providers: [BrowserHistoryService],
})
export class BrowserComponent implements AfterViewInit {
  @Input() url: string;
  @ViewChild('iframe') iframe: ElementRef<HTMLIFrameElement>;
  currentUrl$ = this.browserHistoryService.currentHistory$;
  currentHistorySubscription: Subscription;
  urlControl = new FormControl('');

  constructor(private browserHistoryService: BrowserHistoryService) {}

  ngAfterViewInit(): void {
    this.browserHistoryService.currentHistory$.subscribe((latest) => {
      console.log({ latest });
      this.urlControl.setValue(latest);
      this.iframe.nativeElement.setAttribute('src', latest);
    });

    if (this.url) {
      this.go(this.url);
    }
  }

  back() {
    this.browserHistoryService.previousHistoryState();
  }

  forward() {
    this.browserHistoryService.nextHistoryState();
  }

  refresh() {
    this.browserHistoryService.currentHistory$
      .pipe(take(1))
      .subscribe((current) => {
        this.iframe.nativeElement.setAttribute('src', undefined);
        this.iframe.nativeElement.setAttribute('src', current);
      });
  }

  go(startingUrl?: string) {
    const url = startingUrl ?? this.urlControl.value;
    this.browserHistoryService.pushHistoryState(url);
  }
}
