import { TestBed, inject } from '@angular/core/testing';

import { SfmapService } from './sfmap.service';

describe('SfmapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SfmapService]
    });
  });

  it('should be created', inject([SfmapService], (service: SfmapService) => {
    expect(service).toBeTruthy();
  }));
});
