import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { ApiResponse, datosPersonales, detalleUsuario, orquestarDatos } from "./uniminuto.interface";
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiUniminutoService {
  private apiUrl = environment.apiUrl;
  private apiDatosPersonales = environment.apiDatosPersonales;
  private apiConsultarCuenta = environment.consultarCuenta;

  constructor(private http: HttpClient) { }
  validarCaptcha(captchaResponse: string): Observable<ApiResponse> {
    const body = { captchaResponse };
    return this.http.post<ApiResponse>(`${this.apiUrl}/validar`, body);
  }
  obtenerDatos(correo: string): Observable<orquestarDatos> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'apikey': environment.key,
    });
    return this.getDatosPersonales(correo, headers).pipe(
      switchMap(personales => {
        return this.getConsultarCuenta(correo, headers).pipe(
          map(detalleUsuario => {
            return { personales, detalleUsuario: detalleUsuario[0] };
          })
        );
      })
    );
  }
  getDatosPersonales(correo: string, headers: HttpHeaders): Observable<datosPersonales> {
    return this.http.post<datosPersonales>(this.apiDatosPersonales, { correo }, { headers });
  }
  getConsultarCuenta(correo: string, headers: HttpHeaders): Observable<detalleUsuario[]> {
    const payload = {
      "peticion": {
        "filter": `(mail=${correo})`
      }
    }
    return this.http.post<detalleUsuario[]>(this.apiConsultarCuenta, payload, { headers })
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
    }
    // Aquí puedes realizar alguna acción adicional como loguear el error
    console.error(errorMessage);
    // Retornar un observable con un error para que el componente lo maneje
    return throwError(() => new Error('Algo salió mal. Por favor, intenta nuevamente más tarde. o Comunicate con soporte a través de https://soporte.uniminuto.edu.'));
  }
  enviarDatos(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/uploads`, formData);
  };
}
