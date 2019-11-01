import { TestBed } from '@angular/core/testing';

import { GetCommentsService } from './get-comments.service';

describe('GetCommentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCommentsService = TestBed.get(GetCommentsService);
    expect(service).toBeTruthy();
  });
});
