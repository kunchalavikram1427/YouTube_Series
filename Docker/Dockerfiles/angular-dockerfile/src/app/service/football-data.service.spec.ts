import { TestBed } from '@angular/core/testing';

import { FootballDataService } from './football-data.service';

describe('FootballDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FootballDataService = TestBed.get(FootballDataService);
    expect(service).toBeTruthy();
  });
});
