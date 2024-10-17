import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from "./shared/footer/footer.component";
import { HomeComponent } from "./layout/home/home.component";
import { DashboardComponent } from './layout/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HomeComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Descuentos UNIMINUTO';
  version = '1.0.0';
}