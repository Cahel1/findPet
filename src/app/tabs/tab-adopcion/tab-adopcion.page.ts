import { Component, OnInit } from '@angular/core';
import { pets } from 'src/app/interface/pet-interface';
import { ApiPetService } from 'src/app/services/api-pet.service';

@Component({
  selector: 'app-tab-adopcion',
  templateUrl: './tab-adopcion.page.html',
  styleUrls: ['./tab-adopcion.page.scss'],
})
export class TabAdopcionPage implements OnInit {
  mascs: pets[] = [];

  constructor(
    private apiPetService: ApiPetService // Inyección del servicio
  ) {}

  ngOnInit(): void {
    this.obtenerMascotas(); // Llamamos al método para obtener las mascotas
  }

  obtenerMascotas(): void {
    const petitos = localStorage.getItem('mascotas');
    if (petitos) {
      this.mascs = JSON.parse(petitos);
      console.log('Obtiene mascotas desde el local storage');
    } else {
      this.apiPetService.obtenerPets().subscribe((respuesta) => {
        console.log('Obtiene mascotas desde API');
        // Limpia las etiquetas HTML antes de asignar los datos
        this.mascs = respuesta.data.map((masc) => ({
          ...masc,
          desc_fisica: this.stripHTML(masc.desc_fisica),
          desc_personalidad: this.stripHTML(masc.desc_personalidad),
          desc_adicional: this.stripHTML(masc.desc_adicional),
        }));
        // Se almacena en localStorage
        localStorage.setItem('mascotas', JSON.stringify(this.mascs));
        console.log('Almacena en localStorage');
      });
    }
  }

  // Función para limpiar etiquetas HTML
  stripHTML(html: string): string {
    return html ? html.replace(/<\/?[^>]+(>|$)/g, '') : ''; // Remueve etiquetas HTML
  }
}