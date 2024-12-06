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
    alertControllerSpy.calls.reset();
    localStorage.clear();
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería recuperar las mascotas de localStorage si están disponibles', () => {
    const mockPets = [{ nombre: 'Fido' }] as pets[];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockPets));

    component.obtenerMascotas();

    expect(localStorage.getItem).toHaveBeenCalledWith('mascotas');
    expect(component.mascs).toEqual(mockPets);
  });

  it('debería almacenar las mascotas obtenidas en localStorage', () => {
    const mockPets = [{ nombre: 'Fido', desc_adicional: '', desc_fisica: '', desc_personalidad: '' }] as pets[];
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(apiPetService, 'obtenerPets').and.returnValue(of({ data: mockPets } as any));
    const setItemSpy = spyOn(localStorage, 'setItem');

    component.obtenerMascotas();

    expect(apiPetService.obtenerPets).toHaveBeenCalled();
    expect(setItemSpy).toHaveBeenCalledWith('mascotas', JSON.stringify(mockPets));
  });

  it('debería manejar correctamente una solicitud de adopción válida', async () => {
    const mockPet = { nombre: 'Fido' } as pets;

    await component.adoptarMascota(mockPet);

    expect(alertControllerSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      header: `¿Adoptar a Fido?`,
    }));
  });

  it('debería llamar al alertController con datos correctos en la solicitud de adopción', async () => {
    const mockPet = { nombre: 'Fido' } as pets;

    await component.adoptarMascota(mockPet);

    expect(alertControllerSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      header: `¿Adoptar a Fido?`,
    }));
  });

  it('debería mostrar un error si el teléfono en la solicitud de adopción es inválido', async () => {
    const mockPet = { nombre: 'Fido' } as pets;
    const adoptionData = { name: 'John', phone: 'invalidPhone' };

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

  it('debería validar correctamente el formato del teléfono', () => {
    expect(component.isValidPhone('123456789')).toBeTrue();
    expect(component.isValidPhone('12345')).toBeFalse();
    expect(component.isValidPhone('abcdefghi')).toBeFalse();
  });

  it('debería manejar correctamente una solicitud de adopción válida sin usar un espía', async () => {
    const mockPet = { nombre: 'Fido' } as pets;

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
