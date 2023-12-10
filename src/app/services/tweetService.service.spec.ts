/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TweetServiceService } from './tweetService.service';

describe('Service: TweetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TweetServiceService]
    });
  });

  it('should ...', inject([TweetServiceService], (service: TweetServiceService) => {
    expect(service).toBeTruthy();
  }));
});
