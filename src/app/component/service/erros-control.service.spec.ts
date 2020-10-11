import { TestBed } from '@angular/core/testing';

import { ErrosControlService } from './erros-control.service';

describe('ErrosControlService', () => {
  let service: ErrosControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrosControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
