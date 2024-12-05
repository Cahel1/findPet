import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabAdopcionPage } from './tab-adopcion.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { ApiPetService } from 'src/app/services/api-pet.service';
import { of } from 'rxjs';
import { pets } from 'src/app/interface/pet-interface';

describe('TabAdopcionPage', () => {
  let component: TabAdopcionPage;
  let fixture: ComponentFixture<TabAdopcionPage>;
  let apiPetService: ApiPetService;
  let alertControllerSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabAdopcionPage],
      imports: [
        IonicModule.forRoot(),
        CommonModule,
        HttpClientTestingModule,
      ],
      providers: [ApiPetService],
    }).compileComponents();

    fixture = TestBed.createComponent(TabAdopcionPage);
    component = fixture.componentInstance;
    apiPetService = TestBed.inject(ApiPetService);
    fixture.detectChanges();

    // Inicializar el espía antes de cada prueba
    alertControllerSpy = spyOn(component['alertController'], 'create').and.callFake(async (options: any) => {
      return {
        present: async () => {
          const handler = options.buttons.find((btn: any) => btn.text === 'Adoptar')?.handler;
          if (handler) {
            await handler({ name: 'John', phone: '12345678' });
          }
        },
      } as any;
    });
  });

  afterEach(() => {
    // Restaurar el espía después de cada prueba
    alertControllerSpy.calls.reset();
    // Restaurar localStorage a su estado original
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve pets from localStorage if available', () => {
    const mockPets = [{ nombre: 'Fido' }] as pets[];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockPets));

    component.obtenerMascotas();

    expect(localStorage.getItem).toHaveBeenCalledWith('mascotas');
    expect(component.mascs).toEqual(mockPets);
  });

  it('should store fetched pets in localStorage', () => {
    const mockPets = [{ nombre: 'Fido', desc_adicional: '', desc_fisica: '', desc_personalidad: '' }] as pets[];
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(apiPetService, 'obtenerPets').and.returnValue(of({ data: mockPets } as any));
    const setItemSpy = spyOn(localStorage, 'setItem');

    component.obtenerMascotas();

    expect(apiPetService.obtenerPets).toHaveBeenCalled();
    expect(setItemSpy).toHaveBeenCalledWith('mascotas', JSON.stringify(mockPets));
  });

  it('should handle valid adoption request', async () => {
    const mockPet = { nombre: 'Fido' } as pets;

    // Usar el espía configurado en el beforeEach
    await component.adoptarMascota(mockPet);

    expect(alertControllerSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      header: `¿Adoptar a Fido?`,
    }));
  });

  it('should call alertController with correct data on adoption request', async () => {
    const mockPet = { nombre: 'Fido' } as pets;
    const adoptionData = { name: 'John', phone: '12345678' };

    // Usar el espía configurado en el beforeEach
    await component.adoptarMascota(mockPet);

    expect(alertControllerSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      header: `¿Adoptar a Fido?`,
    }));
  });

  it('should display error if adoption request has invalid phone', async () => {
    const mockPet = { nombre: 'Fido' } as pets;
    const adoptionData = { name: 'John', phone: 'invalidPhone' };

    // Actualizar el espía para simular la creación de la alerta
    alertControllerSpy.and.callFake(async (options: any) => {
      return {
        present: async () => {
          const handler = options.buttons.find((btn: any) => btn.text === 'Adoptar')?.handler;
          if (handler) {
            await handler(adoptionData);
          }
        },
      } as any;
    });

    await component.adoptarMascota(mockPet);

    expect(alertControllerSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      header: 'Error',
      message: 'Por favor, completa todos los campos correctamente.',
    }));
  });

  it('should validate phone format correctly', () => {
    expect(component.isValidPhone('123456789')).toBeTrue();
    expect(component.isValidPhone('12345')).toBeFalse();
    expect(component.isValidPhone('abcdefghi')).toBeFalse();
  });

  it('should handle valid adoption request without spy', async () => {
    const mockPet = { nombre: 'Fido' } as pets;

    // Actualiza el comportamiento del spy solo en esta prueba, si es necesario
    alertControllerSpy.and.callFake(async (options: any) => {
      return {
        present: async () => {
          const handler = options.buttons.find((btn: any) => btn.text === 'Adoptar')?.handler;
          if (handler) {
            await handler({ name: 'John', phone: '12345678' });
          }
        },
      } as any;
    });

    await component.adoptarMascota(mockPet);

    expect(alertControllerSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      header: `¿Adoptar a Fido?`,
    }));
  });
});
