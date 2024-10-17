import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { RecaptchaModule } from 'ng-recaptcha';

import { FooterComponent } from '../../shared/footer/footer.component';
import { correoUniminuto } from "../../shared/validators/correoUniminuto.validator";
import { ApiUniminutoService } from '../../services/api-uniminuto.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, ReactiveFormsModule, CommonModule, RecaptchaModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  form: FormGroup;
  captchaResponse: string = '';
  mensaje: string | null = null;
  constructor(private fb: FormBuilder, private apiService: ApiUniminutoService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email, correoUniminuto('@uniminuto.edu.co')]]
    });
  }
  captcha(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }
  onSubmit() {
    if (this.form.valid && this.captchaResponse != null) {
      this.apiService.validarCaptcha(this.captchaResponse).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          if (response.respuesta === true) {
            const email = this.form.get('email')?.value;
            this.router.navigate(['/dashboard', { email }]);
          }
        },
        error: (error) => {
          console.error('Error al enviar el formulario:', error);
          this.mensaje = 'Error al validar el captcha. Intente nuevamente.';
        }
      }
      );
    }
    else {
      this.mensaje = 'Debes completar el captcha y escribir un correo válido en el formulario.';
    }
  }
}
