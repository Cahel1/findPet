import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { NuevaMascotaPage } from './nueva-mascota.page';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('NuevaMascotaPage', () => {
  let component: NuevaMascotaPage;
  let fixture: ComponentFixture<NuevaMascotaPage>;
  let router: Router;
  let alertController: AlertController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuevaMascotaPage],
      imports: [IonicModule.forRoot(), CommonModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [AlertController],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaMascotaPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    alertController = TestBed.inject(AlertController);
    fixture.detectChanges();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería recuperar la imagen capturada desde el localStorage en ngOnInit', () => {
    const mockImage = 'mockImageData';
    spyOn(localStorage, 'getItem').and.returnValue(mockImage);
    component.ngOnInit();
    expect(component.capturedImage).toBe(mockImage);
  });

  it('debería navegar a /tab-home cuando se llame a volverHome', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.volverHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/tab-home']);
  });

  it('debería mostrar una alerta de error si los campos están incompletos al llamar a enviarMascota', async () => {
    component.nombre = '';
    const alertSpy = spyOn(alertController, 'create').and.callThrough();
    await component.enviarMascota();

    expect(alertSpy).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Por favor, completa todos los campos antes de enviar la información.',
      buttons: ['OK'],
    });
  });

  it('debería mostrar una alerta de error si el correo es inválido al llamar a enviarMascota', async () => {
    component.nombre = 'Mascota 1';
    component.tipo = 'Perro';
    component.descripcionFisica = 'Descripción de la mascota';
    component.edad = '2';
    component.correo = 'correo_invalido';
    const alertSpy = spyOn(alertController, 'create').and.callThrough();

    await component.enviarMascota();

    expect(alertSpy).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Por favor, ingresa un correo válido.',
      buttons: ['OK'],
    });
  });
});
