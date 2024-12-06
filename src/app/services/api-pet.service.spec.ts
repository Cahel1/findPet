import { TestBed } from '@angular/core/testing';

import { ApiPetService } from './api-pet.service';
import { HttpClientModule } from '@angular/common/http';

describe('Servicio ApiPetService', () => {
  let service: ApiPetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ApiPetService);
  });

  it('debería crear el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });
});
