import { TestBed, inject } from '@angular/core/testing';

import { NextBusService } from './next-bus.service';

describe('NextBusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NextBusService]
    });
  });

  it('should be created', inject([NextBusService], (service: NextBusService) => {
    expect(service).toBeTruthy();
  }));
});
