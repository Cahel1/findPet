import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-nueva-mascota',
  templateUrl: './nueva-mascota.page.html',
  styleUrls: ['./nueva-mascota.page.scss'],
})
export class NuevaMascotaPage implements OnInit {
  capturedImage: string | null = null;
  nombre: string = '';
  tipo: string = '';
  descripcionFisica: string = '';
  personalidad: string = '';
  edad: string = '';
  correo: string = '';
  comuna: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {

    this.capturedImage = localStorage.getItem('capturedImage');
  }


  captureImage(imageData: string) {
    this.capturedImage = imageData;
    localStorage.setItem('capturedImage', this.capturedImage);
  }


  volverHome() {
    this.router.navigate(['/tab-home']);
  }

  resetForm() {
    this.nombre = '';
    this.tipo = '';
    this.descripcionFisica = '';
    this.personalidad = '';
    this.edad = '';
    this.correo = '';
    this.comuna = '';
  }

  async enviarMascota() {
    if (this.nombre && this.tipo && this.descripcionFisica && this.personalidad && this.edad && this.correo && this.comuna) {
      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo);
      if (!correoValido) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Por favor, ingresa un correo válido.',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }

      const nuevaMascota = {
        nombre: this.nombre,
        tipo: this.tipo,
        desc_fisica: this.descripcionFisica,
        desc_personalidad: this.personalidad,
        edad: this.edad,
        correo: this.correo,
        comuna: this.comuna,
        imagen: this.capturedImage,
      };

      let mascotas = JSON.parse(localStorage.getItem('mascotas') || '[]');
      mascotas.unshift(nuevaMascota);
      localStorage.setItem('mascotas', JSON.stringify(mascotas));

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'La mascota ha sido enviada exitosamente. Pronto nos pondremos en contacto contigo.',
        buttons: [
          {
            text: 'OK',
            handler: () => {

              this.capturedImage = null;
              this.resetForm();
              this.router.navigate(['/tab-adopcion']);
            },
          },
        ],
      });

      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos antes de enviar la información.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
