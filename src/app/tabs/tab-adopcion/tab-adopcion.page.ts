import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { pets } from 'src/app/interface/pet-interface';
import { ApiPetService } from 'src/app/services/api-pet.service';

@Component({
  selector: 'app-tab-adopcion',
  templateUrl: './tab-adopcion.page.html',
  styleUrls: ['./tab-adopcion.page.scss'],
})
export class TabAdopcionPage implements OnInit {
  mascs: pets[] = [];
  capturedImages: string[] = [];

  constructor(
    private apiPetService: ApiPetService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.obtenerMascotas();
  }

  ionViewWillEnter() {
    this.obtenerMascotas();
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
    const capturedImages = JSON.parse(localStorage.getItem('capturedImages') || '[]');
    this.capturedImages = capturedImages;
  }

  stripHTML(html: string): string {
    return html ? html.replace(/<\/?[^>]+(>|$)/g, '') : '';
  }

  isValidPhone(phone: string): boolean {
    const phonePattern = /^[0-9]{9}$/;
    return phonePattern.test(phone);
  }

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
          placeholder: 'Ejemplo: 912345678',
          id: 'phone-input',
          attributes: {
            inputmode: 'tel',
            maxlength: 9,
          },
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

              this.alertController.create({
                header: 'Éxito',
                message: 'Tu solicitud de adopción ha sido enviada.',
                buttons: ['OK'],
              }).then(alert => alert.present());

              return true;
            } else {
              this.alertController.create({
                header: 'Error',
                message: 'Por favor, completa todos los campos correctamente.',
                buttons: ['OK'],
              }).then(alert => alert.present());
              return false;
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
