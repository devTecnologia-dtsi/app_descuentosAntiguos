import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() idBanner: string = '0';
  desplegado = false;
  screenWidth!: number;
  foto: string = '';
  constructor(private eRef: ElementRef, private router: Router) { }
  desplegable() {
    this.desplegado = !this.desplegado;
  }

  logout() {
    this.router.navigate(['']);
  }
  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.foto = `https://fotografias.uniminuto.edu/basicImages/${this.idBanner}`
  }
  cambiarFoto() {
    window.open('https://uwallet.uniminuto.edu/dashboard', '_blank');
  }
  // Cerrar menú al dar clic fuera del header
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.desplegado = false;
    }
  }
}
