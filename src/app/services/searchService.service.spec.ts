/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchServiceService } from './searchService.service';

describe('Service: SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchServiceService]
    });
  });

  it('should ...', inject([SearchServiceService], (service: SearchServiceService) => {
    expect(service).toBeTruthy();
  }));
});
