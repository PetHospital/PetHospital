import { TestBed, inject } from '@angular/core/testing';

import { ColletionService } from './colletion.service';

describe('ColletionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColletionService]
    });
  });

  it('should be created', inject([ColletionService], (service: ColletionService) => {
    expect(service).toBeTruthy();
  }));
});
