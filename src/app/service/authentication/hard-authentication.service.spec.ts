import { TestBed } from '@angular/core/testing';

import { HardAuthenticationService } from './hard-authentication.service';

describe('HardAuthenticationService', () => {
  let service: HardAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
