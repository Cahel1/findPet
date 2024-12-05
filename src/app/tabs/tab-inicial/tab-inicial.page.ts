import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Importar el plugin de la cámara
import { Router } from '@angular/router';  // Importar Router

@Component({
  selector: 'app-tab-inicial',
  templateUrl: './tab-inicial.page.html',
  styleUrls: ['./tab-inicial.page.scss'],
})
export class TabInicialPage implements OnInit {

  constructor(private router: Router) {  // Inyectar Router
    addIcons({ library, playCircle, radio, search });
  }

  ngOnInit() {}

  // Función para abrir la cámara y redirigir a nueva-mascota
  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
      const imageData = image.webPath || ''; // Obtener la URL de la imagen capturada
      if (imageData) {
        // Guardar la imagen en el localStorage
        localStorage.setItem('capturedImage', imageData);

        this.router.navigate(['/nueva-mascota']);
      }
    } catch (error) {
      // console.error('Error al abrir la cámara:', error);
    }
  }
}
