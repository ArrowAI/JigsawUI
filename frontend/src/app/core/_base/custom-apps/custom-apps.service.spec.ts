import { TestBed } from '@angular/core/testing';

import { CustomAppsService } from './custom-apps.service';

describe('CustomAppsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomAppsService = TestBed.get(CustomAppsService);
    expect(service).toBeTruthy();
  });
});
