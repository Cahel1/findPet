import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabNosotrosPage } from './tab-nosotros.page';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TabNosotrosPage', () => {
  let component: TabNosotrosPage;
  let fixture: ComponentFixture<TabNosotrosPage>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    await TestBed.configureTestingModule({
      declarations: [TabNosotrosPage],
      imports: [IonicModule.forRoot(), CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: AlertController, useValue: alertControllerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TabNosotrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email correctly', () => {
    expect(component.isValidEmail('test@example.com')).toBeTrue();
    expect(component.isValidEmail('invalid-email')).toBeFalse();
  });

  it('should show an alert for joining the cause', async () => {
    alertControllerSpy.create.and.returnValue(
      Promise.resolve({
        present: jasmine.createSpy('present'),
      } as any)
    );

    await component.uneteACausa();

    expect(alertControllerSpy.create).toHaveBeenCalledWith(
      jasmine.objectContaining({
        header: 'Únete a nuestra causa',
        message: 'Por favor, ingresa tu correo electrónico para unirte a nuestra causa.',
      })
    );
  });

  it('should handle valid email submission', async () => {
    alertControllerSpy.create.and.returnValue(
      Promise.resolve({
        present: jasmine.createSpy('present'),
        buttons: [
          {
            text: 'Unirme',
            handler: (data: any) => {
              expect(data.email).toBe('test@example.com');
              return true;
            },
          },
        ],
      } as any)
    );

    await component.uneteACausa();

    expect(alertControllerSpy.create).toHaveBeenCalledWith(
      jasmine.objectContaining({
        header: 'Únete a nuestra causa',
      })
    );
  });

  it('should handle invalid email submission', async () => {
    alertControllerSpy.create.and.returnValue(
      Promise.resolve({
        present: jasmine.createSpy('present'),
        buttons: [
          {
            text: 'Unirme',
            handler: (data: any) => {
              expect(data.email).toBe('invalid-email');
              return false;
            },
          },
        ],
      } as any)
    );

    await component.uneteACausa();

    expect(alertControllerSpy.create).toHaveBeenCalledWith(
      jasmine.objectContaining({
        header: 'Únete a nuestra causa',
        message: 'Por favor, ingresa tu correo electrónico para unirte a nuestra causa.',
      })
    );
  });
});
