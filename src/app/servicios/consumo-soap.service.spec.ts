import { TestBed } from '@angular/core/testing';

import { ConsumoSoapService } from './consumo-soap.service';

describe('ConsumoSoapService', () => {
  let service: ConsumoSoapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumoSoapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
