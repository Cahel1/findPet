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
  descripcionFisica: string = ''; // Descripción física
  personalidad: string = ''; // Personalidad
  edad: string = '';
  correo: string = '';
  comuna: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    // Recuperar la imagen desde localStorage
    this.capturedImage = localStorage.getItem('capturedImage');
  }

  // Función para volver al tab-home
  volverHome() {
    this.router.navigate(['/tab-home']);
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
        desc_fisica: this.descripcionFisica, // Cambié el nombre de "descripcionFisica" a "desc_fisica"
        desc_personalidad: this.personalidad, // Cambié el nombre de "personalidad" a "desc_personalidad"
        edad: this.edad,
        correo: this.correo,
        comuna: this.comuna,
        imagen: this.capturedImage,
      };

      // Obtener las mascotas almacenadas en localStorage
      let mascotas = JSON.parse(localStorage.getItem('mascotas') || '[]');

      // Insertar la nueva mascota al principio de la lista
      mascotas.unshift(nuevaMascota); // Agregar la nueva mascota al inicio del array

      // Guardar la lista actualizada en localStorage
      localStorage.setItem('mascotas', JSON.stringify(mascotas));

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'La mascota ha sido enviada exitosamente. Pronto nos pondremos en contacto contigo.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              // Navegar al tab de adopción y actualizar la vista
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
