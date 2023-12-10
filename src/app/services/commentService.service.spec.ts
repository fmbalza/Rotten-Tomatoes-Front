/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommentServiceService } from './commentService.service';

describe('Service: CommentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentServiceService]
    });
  });

  it('should ...', inject([CommentServiceService], (service: CommentServiceService) => {
    expect(service).toBeTruthy();
  }));
});
