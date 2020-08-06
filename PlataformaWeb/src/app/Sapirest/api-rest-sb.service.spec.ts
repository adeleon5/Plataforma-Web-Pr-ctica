import { TestBed } from '@angular/core/testing';

import { ApiRestSBService } from './api-rest-sb.service';

describe('ApiRestSBService', () => {
  let service: ApiRestSBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRestSBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
