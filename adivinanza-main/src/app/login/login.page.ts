import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GameApiService } from '../services/game-api.service';
import { ToastController } from '@ionic/angular'; // Para mostrar feedback

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';
  password: string = '';
  errorMessage: string = ''; // Para almacenar mensajes de error

  constructor(
    private router: Router,
    private api: GameApiService,
    private toastController: ToastController // Para mostrar los toasts
  ) {}

  ngOnInit() {}

  // Función para mostrar toasts
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  async onClickIngresar(form: NgForm) {
    // Validar si el formulario es inválido
    if (form.invalid) {
      this.presentToast('Por favor, completa todos los campos.');
      console.log('Formulario inválido');
      return;
    }

    // Llamada al servicio de login
    try {
      await this.api.login(this.usuario, this.password);
      this.router.navigate(['/menu']); // Navegar a la página de menú si el login es exitoso
    } catch (error: unknown) {
      // Comprobar si el error tiene la forma esperada
      if (error instanceof Error && error.message) {
        this.errorMessage = error.message || 'Hubo un error al intentar iniciar sesión.';
      } else if (error && (error as any).error?.message) {
        // Si el error tiene la estructura 'error.message'
        this.errorMessage = (error as any).error.message || 'Hubo un error al intentar iniciar sesión.';
      } else {
        this.errorMessage = 'Hubo un error desconocido.';
      }

      this.presentToast(this.errorMessage); // Mostrar un mensaje de error si el login falla
      console.error('LOGIN ERROR:', error);
    }
  }
}
