import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class BrowserHistoryService {
  private historyState: string[] = [];
  private historyStateSubject = new BehaviorSubject(this.historyState);
  private historyIndex = -1;

  currentHistory$ = this.historyStateSubject
    .asObservable()
    .pipe(map((historyState) => historyState[this.historyIndex] ?? ''));

  pushHistoryState(url: string) {
    this.historyState.push(url);
    this.historyIndex = this.historyState.length - 1;
    this.historyStateSubject.next(this.historyState);
  }

  nextHistoryState() {
    let historyIndex = this.historyIndex;
    historyIndex += 1;
    if (historyIndex < this.historyState.length) {
      this.historyIndex = historyIndex;
      this.historyStateSubject.next(this.historyState);
    }
  }

  previousHistoryState() {
    let historyIndex = this.historyIndex;
    historyIndex -= 1;
    if (historyIndex >= 0) {
      this.historyIndex = historyIndex;
      this.historyStateSubject.next(this.historyState);
    }
  }
}
