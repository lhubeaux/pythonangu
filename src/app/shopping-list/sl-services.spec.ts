import { TestBed } from '@angular/core/testing';

import { SLServices } from './sl-services';

describe('SLServices', () => {
  let service: SLServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SLServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
