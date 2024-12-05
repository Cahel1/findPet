import { TestBed } from '@angular/core/testing';

import { ApiPetService } from './api-pet.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApiPetService', () => {
  let service: ApiPetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ApiPetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
