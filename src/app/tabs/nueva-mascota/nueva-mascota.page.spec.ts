import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaMascotaPage } from './nueva-mascota.page';

describe('NuevaMascotaPage', () => {
  let component: NuevaMascotaPage;
  let fixture: ComponentFixture<NuevaMascotaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaMascotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
