import { TestBed } from '@angular/core/testing';

import { InMemoryDataBaseService } from './in-memory-data-base.service';

describe('InMemoryDataBaseService', () => {
  let service: InMemoryDataBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDataBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
