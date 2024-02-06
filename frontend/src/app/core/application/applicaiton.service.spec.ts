import { TestBed } from '@angular/core/testing';

import { ApplicaitonService } from './applicaiton.service';

describe('ApplicaitonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicaitonService = TestBed.get(ApplicaitonService);
    expect(service).toBeTruthy();
  });
});
