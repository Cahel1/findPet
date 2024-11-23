import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';  // Importar el plugin de la cámara

@Component({
  selector: 'app-tab-inicial',
  templateUrl: './tab-inicial.page.html',
  styleUrls: ['./tab-inicial.page.scss'],
})
export class TabInicialPage implements OnInit {

  constructor() {
    addIcons({ library, playCircle, radio, search });
  }

  ngOnInit() {}

  // Función para abrir la cámara
  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
      console.log('Imagen capturada:', image);
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }
}
