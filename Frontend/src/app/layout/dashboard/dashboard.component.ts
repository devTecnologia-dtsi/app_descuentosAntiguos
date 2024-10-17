import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderComponent } from '../../shared/header/header.component';
import { ApiUniminutoService } from '../../services/api-uniminuto.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  foto: string = "";
  uploadFoto: string = '';
  isLoading: boolean = true;
  mostrarMensaje: boolean = false;
  error: boolean = false;

  email: string | null = null;
  facultad: string | null = null;
  idBanner: string | null = null;
  modalidad: string | null = null;
  nivel: string | null = null;
  programa: string | null = null;
  rectoria: string | null = null;
  sede: string | null = null;
  // Desde API 2
  nombres: string | null = null;
  apellidos: string | null = null;
  documento: string | null = null;
  jornada: string | null = null;

  // Datos del formulario
  descuentoSel: string = '';
  archivoCargado: File | null = null;
  mensaje: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiUniminutoService) { }
  ngOnInit() {
    // Recuperar el parámetro 'email' de la ruta
    this.route.paramMap.subscribe(params => {
      this.email = params.get('email'); // Asignar el valor del email
    });
    if (this.email != null) {
      this.apiService.obtenerDatos(this.email).subscribe({
        next: (response) => {
          // if (!response.personales.resultado) {
          //   console.log('Respuesta del servidor:', response)
          // } else {
          this.facultad = response.personales.body?.facultad!;
          this.idBanner = response.personales.body?.idBanner!;
          this.foto = `https://fotografias.uniminuto.edu/basicImages/${this.idBanner}`
          this.uploadFoto = `https://uwallet.uniminuto.edu/dashboard`
          this.modalidad = response.personales.body?.modalidad!;
          this.nivel = response.personales.body?.nivel!;
          this.programa = response.personales.body?.programa!;
          this.rectoria = response.personales.body?.rectoria!;
          this.sede = response.personales.body?.sede!;
          this.nombres = response.detalleUsuario.givenName;
          this.apellidos = response.detalleUsuario.sn;
          this.documento = response.detalleUsuario.pager;
          this.jornada = 'NULL';
          this.isLoading = false;
          // }
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
          this.isLoading = false;
          alert(error.message);
        }
      })
    }

  }
  onSubmit(form: NgForm): void {
    if (form.valid) { // Verifica si el formulario es válido
      this.isLoading = !this.isLoading;
      const selectedFile = this.fileInput.nativeElement.files[0]; // Obtener el archivo seleccionado
      if (selectedFile && selectedFile.type == 'application/pdf') {
        // Procesar el archivo
        const nombres = this.nombres + " " + this.apellidos;
        const pdf = this.idBanner + ".pdf";
        const formData = new FormData();
        formData.append('idBanner', this.idBanner!);
        formData.append('correo', this.email!);
        formData.append('nombres', nombres!);
        formData.append('descuento', this.descuentoSel!);
        formData.append('file', selectedFile, pdf);
        this.apiService.enviarDatos(formData).subscribe(
          {
            next: (data) => {
              console.log('Se ha enviado los datos correctamente', data);
              this.isLoading = !this.isLoading;
              this.mensaje = 'El documento se ha cargado exitosamente';
              this.mostrarMensaje = true;
              this.error = false;
              setTimeout(() => {
                this.isLoading = !this.isLoading;
                this.router.navigate(['']);
              }, 4000);
              // }
            },
            error: (error) => {
              console.error('Error al enviar los datos:', error.error.mensaje);
              this.mensaje = 'Error: ' + error.error.mensaje;
              this.mostrarMensaje = true;
              this.error = true;
              this.isLoading = !this.isLoading;
              setTimeout(() => {
                this.isLoading = !this.isLoading;
                this.router.navigate(['']);
              }, 4000);
            }
          }
        );
      }
    } else {
      console.log('Formulario inválido');
      this.mensaje = 'Por favor selecciona todos los campos requeridos';
      this.mostrarMensaje = true;
      this.error = true;
    }
  }
  closeAlert() {
    this.mostrarMensaje = false;
  }

}
