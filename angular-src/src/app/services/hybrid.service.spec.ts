/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HybridService } from './hybrid.service';

describe('HybridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HybridService]
    });
  });

  it('should ...', inject([HybridService], (service: HybridService) => {
    expect(service).toBeTruthy();
  }));
});
