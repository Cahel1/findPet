import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabHomePage } from './tab-home.page';
import { HttpClientModule } from '@angular/common/http';
import { ApiPetService } from 'src/app/services/api-pet.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

describe('TabHomePage', () => {
  let component: TabHomePage;
  let fixture: ComponentFixture<TabHomePage>;
  let apiPetService: ApiPetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabHomePage],
      imports: [
        HttpClientModule,
        IonicModule,
        CommonModule
      ],
      providers: [ApiPetService],
    }).compileComponents();

    fixture = TestBed.createComponent(TabHomePage);
    component = fixture.componentInstance;
    apiPetService = TestBed.inject(ApiPetService);
    fixture.detectChanges();
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });
});
