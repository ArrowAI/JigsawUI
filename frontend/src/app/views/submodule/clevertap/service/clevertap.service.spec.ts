import { TestBed } from '@angular/core/testing';

import { ClevertapService } from './clevertap.service';

describe('ClevertapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClevertapService = TestBed.get(ClevertapService);
    expect(service).toBeTruthy();
  });
});
