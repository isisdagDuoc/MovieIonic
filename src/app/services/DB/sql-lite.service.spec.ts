import { TestBed } from '@angular/core/testing';

import { SQLiteService } from './sql-lite.service';

describe('SqlLiteService', () => {
  let service: SQLiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SQLiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
