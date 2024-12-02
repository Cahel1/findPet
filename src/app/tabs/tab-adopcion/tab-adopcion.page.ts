import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'; // Para manejar alertas
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
    private apiPetService: ApiPetService, // Servicio API
    private alertController: AlertController // AlertController para los datos adoptar
  ) {}

  ngOnInit(): void {
    this.obtenerMascotas(); // Obtener las mascotas al iniciar
  }

  obtenerMascotas(): void {
    const petitos = localStorage.getItem('mascotas');
    if (petitos) {
      this.mascs = JSON.parse(petitos);
    } else {
      this.apiPetService.obtenerPets().subscribe((respuesta) => {
        this.mascs = respuesta.data.map((masc) => ({
          ...masc,
          desc_fisica: this.stripHTML(masc.desc_fisica),
          desc_personalidad: this.stripHTML(masc.desc_personalidad),
          desc_adicional: this.stripHTML(masc.desc_adicional),
        }));
        localStorage.setItem('mascotas', JSON.stringify(this.mascs));
      });
    }
  }

  // Limpieza de etiquetas HTML
  stripHTML(html: string): string {
    return html ? html.replace(/<\/?[^>]+(>|$)/g, '') : '';
  }

  // Validar formato del teléfono
  isValidPhone(phone: string): boolean {
    const phonePattern = /^[0-9]{8}$/; // Ajusta el patrón según el formato que necesites
    return phonePattern.test(phone);
  }

  // Manejo de solicitud de adopción
  async adoptarMascota(mascota: pets): Promise<void> {
    const alert = await this.alertController.create({
      header: `¿Adoptar a ${mascota.nombre}?`,
      message: `Por favor, confirma si deseas adoptar a ${mascota.nombre}.`,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Tu nombre',
        },
        {
          name: 'phone',
          type: 'tel',
          placeholder: 'Ejemplo: 12312123',
          id: 'phone-input', // ID para poder manipularlo visualmente
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Adoptar',
          handler: (data) => {
            if (data.name && data.phone && this.isValidPhone(data.phone)) {
              console.log('Solicitud enviada:', {
                nombreMascota: mascota.nombre,
                nombreAdoptante: data.name,
                telefono: data.phone,
              });

              // Mostrar una alerta de éxito
              this.alertController.create({
                header: 'Éxito',
                message: 'Tu solicitud de adopción ha sido enviada.',
                buttons: ['OK'],
              }).then(alert => alert.present());

              return true; // Asegura que el valor se devuelve
            } else {
              this.alertController.create({
                header: 'Error',
                message: 'Por favor, completa todos los campos correctamente.',
                buttons: ['OK'],
              }).then(alert => alert.present());
              return false;  // Devuelve false si los datos no son válidos
            }
          },
        },
      ],
    });

    await alert.present();

    // Añadir el prefijo (+569) visualmente al input de teléfono
    const phoneInput = document.querySelector('#phone-input');
    if (phoneInput) {
      const parentDiv = phoneInput.parentElement;

      // Crear el contenedor flex
      const phoneContainer = document.createElement('div');
      phoneContainer.style.display = 'flex';
      phoneContainer.style.alignItems = 'center';

      const prefix = document.createElement('span');
      prefix.textContent = '(+569)';
      prefix.style.marginRight = '8px';
      prefix.style.color = 'black';
      prefix.style.fontSize = '16px';
      prefix.style.fontWeight = 'bold';

      // Colocar el prefijo y el input dentro del contenedor flex
      phoneContainer.appendChild(prefix);
      phoneContainer.appendChild(phoneInput);

      // Reemplaza el div original con el nuevo contenedor flex
      parentDiv?.appendChild(phoneContainer);
    }
  }
}
