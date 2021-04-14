import { TestBed } from '@angular/core/testing';

import { PersonaserviciosService } from './personaservicios.service';

describe('PersonaserviciosService', () => {
  let service: PersonaserviciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaserviciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
