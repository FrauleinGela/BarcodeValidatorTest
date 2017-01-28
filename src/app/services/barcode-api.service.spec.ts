/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BarcodeApiService } from './barcode-api.service';

describe('BarcodeApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarcodeApiService]
    });
  });

  it('should ...', inject([BarcodeApiService], (service: BarcodeApiService) => {
    expect(service).toBeTruthy();
  }));
});
