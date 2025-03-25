import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:9000/api/usuarios'; 

  constructor(private http: HttpClient) {}

  // Función para obtener los headers con el token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }

  // Manejo de errores en las peticiones HTTP
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la API:', error);
    let errorMsg = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error del cliente: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400: errorMsg = 'Solicitud incorrecta'; break;
        case 401: errorMsg = 'No autorizado'; break;
        case 403: errorMsg = 'Prohibido'; break;
        case 404: errorMsg = 'No encontrado'; break;
        case 500: errorMsg = 'Error en el servidor'; break;
      }
    }

    return throwError(() => new Error(errorMsg));
  }

  // Función genérica para hacer peticiones HTTP
  private request<T>(method: string, url: string, body?: any): Observable<T> {
    return this.http.request<T>(method, url, { body, headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Métodos CRUD

  getUsuarios(): Observable<Usuario[]> {
    return this.request<Usuario[]>('GET', this.apiUrl);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.request<Usuario>('GET', `${this.apiUrl}/${id}`);
  }

  getUsuarioByCorreo(correo: string): Observable<Usuario> {
    return this.request<Usuario>('GET', `${this.apiUrl}/correo/${correo}`);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.request<Usuario>('POST', this.apiUrl, usuario);
  }

  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.request<Usuario>('PUT', `${this.apiUrl}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.request<void>('DELETE', `${this.apiUrl}/${id}`);
  }
}
