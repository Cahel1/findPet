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
  descripcion: string = '';
  edad: string = '';
  correo: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
  // Recuperar la imagen desde localStorage
  this.capturedImage = localStorage.getItem('capturedImage');
  // console.log('Imagen capturada:', this.capturedImage);
  }

  // Función para volver al tab-home
  volverHome() {
    this.router.navigate(['/tab-home']);
  }

  async enviarMascota() {
    // Validar que todos los campos estén completos
    if (this.nombre && this.tipo && this.descripcion && this.edad && this.correo) {
      // Validar el formato del correo
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
        descripcion: this.descripcion,
        edad: this.edad,
        correo: this.correo,
        imagen: this.capturedImage,
      };

      // console.log('Mascota enviada:', nuevaMascota);

      // Mostrar alerta de éxito
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'La mascota ha sido Enviada exitosamente, Pronto nos pondremos en contacto contigo.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              // Redirigir al tab-home
              this.router.navigate(['/tab-home']);
            },
          },
        ],
      });

      await alert.present();
    } else {
      // Mostrar alerta de error si faltan campos
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos antes de enviar la información.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
