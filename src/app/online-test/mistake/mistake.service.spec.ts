import { TestBed, inject } from '@angular/core/testing';

import { MistakeService } from './mistake.service';

describe('MistakeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MistakeService]
    });
  });

  it('should be created', inject([MistakeService], (service: MistakeService) => {
    expect(service).toBeTruthy();
  }));
});
