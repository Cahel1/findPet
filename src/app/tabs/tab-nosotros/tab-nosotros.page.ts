import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab-nosotros',
  templateUrl: './tab-nosotros.page.html',
  styleUrls: ['./tab-nosotros.page.scss'],
})
export class TabNosotrosPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  async uneteACausa(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Únete a nuestra causa',
      message: 'Por favor, ingresa tu correo electrónico para unirte a nuestra causa.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Tu correo electrónico',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Unirme',
          handler: (data) => {
            if (data.email && this.isValidEmail(data.email)) {
              console.log('Correo enviado:', data.email);


              this.alertController.create({
                header: 'Éxito',
                message: 'Te has unido a nuestra causa. ¡Gracias!',
                buttons: ['OK'],
              }).then(alert => alert.present());

              return true;
            } else {
              this.alertController.create({
                header: 'Error',
                message: 'Por favor, ingresa un correo electrónico válido.',
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

  // Método para validar el formato del correo electrónico
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
