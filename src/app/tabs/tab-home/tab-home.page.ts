import { Component, OnInit } from '@angular/core';
import { ApiPetService } from 'src/app/services/api-pet.service';
import { pets } from 'src/app/interface/pet-interface';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.page.html',
  styleUrls: ['./tab-home.page.scss'],
})
export class TabHomePage implements OnInit {
  mascs: pets[] = []; // Variable para almacenar las mascotas
  swiperModules = [IonicSlides]; // Se asegura de importar IonicSlides

  constructor(
    private apiPetService: ApiPetService // Inyectamos el servicio para hacer la llamada a la API
  ) {}

  ngOnInit() {
    this.obtenerMascotas(); // Llamamos al método para obtener las mascotas al iniciar
  }

  obtenerMascotas(): void {
    const petitos = localStorage.getItem('mascotas');
    if (petitos) {
      this.mascs = JSON.parse(petitos);
      // console.log('Obtiene mascotas desde el local storage');
    } else {
      this.apiPetService.obtenerPets().subscribe((respuesta) => {
        // console.log('Obtiene mascotas desde API');
        this.mascs = respuesta.data.map((masc) => ({
          ...masc,
          desc_fisica: this.stripHTML(masc.desc_fisica),
          desc_personalidad: this.stripHTML(masc.desc_personalidad),
          desc_adicional: this.stripHTML(masc.desc_adicional),
        }));
        localStorage.setItem('mascotas', JSON.stringify(this.mascs));
        // console.log('Almacena en localStorage');
      });
    }
  }

  // Función para limpiar etiquetas HTML
  stripHTML(html: string): string {
    return html ? html.replace(/<\/?[^>]+(>|$)/g, '') : '';
  }
}
