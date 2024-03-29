import { TestBed } from '@angular/core/testing';

import { GameComService } from './game-com.service';

describe('GameComService', () => {
  let service: GameComService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameComService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
