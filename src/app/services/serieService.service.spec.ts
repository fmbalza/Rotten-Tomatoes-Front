/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SerieService } from './serieService.service'; 

describe('Service: SerieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SerieService]
    });
  });

  it('should ...', inject([SerieService], (service: SerieService) => {
    expect(service).toBeTruthy();
  }));
});
