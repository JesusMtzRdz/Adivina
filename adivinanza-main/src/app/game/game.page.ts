import { Component, OnInit } from '@angular/core';
import { GameApiService } from '../services/game-api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  numero: number = 0;
  mensaje: string = '';
  messageColor: string = '';  // Aquí almacenamos la clase para el color del mensaje

  constructor(private api: GameApiService) {}

  ngOnInit() {}

  // Función para manejar el clic en "Adivinar"
  async onClickAdivinar() {
    try {
      // Borra el mensaje previo antes de intentar un nuevo número
      this.mensaje = '';
      this.messageColor = '';

      // Realizamos la petición para adivinar el número
      const data = await this.api.guess(this.numero);

      // Si el número es correcto
      if (data.message === "Adivinaste el número") {
        this.mensaje = data.message;
        this.messageColor = 'success';  // Verde para éxito
      } else {
        this.mensaje = data.message;  // "Muy bajo" o "Muy alto"
        this.messageColor = 'neutral';  // Amarillo para mensajes neutrales
      }
    } catch (error: any) {
      // Verificamos si error tiene la estructura esperada
      if (error && error.error && error.error.message) {
        this.mensaje = error.error.message;
      } else {
        this.mensaje = 'Error desconocido al intentar adivinar.';
      }
      this.messageColor = 'error';  // Rojo para mensajes de error
    }
  }

  // Función para reiniciar el juego
  async onClickReiniciar() {
    await this.api.restart();
    this.mensaje = '';
    this.numero = 0;
    this.messageColor = '';  // Resetea el color al reiniciar
  }
}
