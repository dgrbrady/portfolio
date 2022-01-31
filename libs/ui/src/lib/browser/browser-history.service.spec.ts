import { TestBed } from '@angular/core/testing';

import { BrowserHistoryService } from './browser-history.service';

describe('BrowserHistoryService', () => {
  let service: BrowserHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
