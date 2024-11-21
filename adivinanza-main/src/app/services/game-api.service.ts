import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';  
 
const _BASE_URL = environment.base_url; 
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class GameApiService { 
 
  constructor( 
    private http: HttpClient ) { } 
 
  // Aquí van los métodos de cada ruta 

  //LOGIN
  
  // LOGIN: Usando lastValueFrom para obtener el token y almacenarlo
  async login(usuario: string, password: string): Promise<any> {
    // Espera la respuesta del Observable y convierte a Promise
    const response = await lastValueFrom(
      this.http.post<{ message: string, token: string }>(
        `${_BASE_URL}/login`, 
        { usuario, password }
      )
    );

    // Almacena el token en el localStorage
    localStorage.setItem('token', response.token);

    // Retorna la respuesta completa (puedes incluir más detalles si lo deseas)
    return response;
  }

//REGISTER
async register(correo: string, usuario: string, password: string): Promise<any>{ 
  return await this.http 
    .post(`${_BASE_URL}/register`, {correo, usuario, password}) 
    .toPromise(); 
}
// START
async start(): Promise<any>{ 
  return await this.http 
    .post(`${_BASE_URL}/start`, {}) 
    .toPromise(); 
}

//GUESS
async guess(numero: number): Promise<any>{ 
  return await this.http 
    .post(`${_BASE_URL}/guess`, {numero}) 
    .toPromise(); 
}

//RESTAR
async restart(): Promise<any>{ 
  return await this.http 
    .post(`${_BASE_URL}/restart`, {}) 
    .toPromise(); 
} 
//METODOS DE INFORMACION
//Status
async status(): Promise<any>{ 
  return await this.http 
    .get(`${_BASE_URL}/status`, {}) 
    .toPromise(); 
}

//LEADERBOARD
async leaderboard(): Promise<any>{ 
  return await this.http 
    .get(`${_BASE_URL}/leaderboard`) 
    .toPromise(); 
}
//STATISTICS
async statistics(): Promise<any>{ 
  return await this.http 
  .get(`${_BASE_URL}/statistics`, {}) 
  .toPromise(); 
}
}
