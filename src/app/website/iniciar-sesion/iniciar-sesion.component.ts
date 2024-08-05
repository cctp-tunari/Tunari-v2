import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.scss'
})
export class IniciarSesionComponent {
  constructor(private router: Router, private appComponent: AppComponent) {}

  onLogin() {
    // Aquí puedes agregar la lógica para validar el formulario y autenticar al usuario
    this.appComponent.setLoginStatus(true); // Actualiza el estado de autenticación
    // Redirigir a la página de administración
    this.router.navigate(['/admin']); // Cambia '/admin' por la ruta a la que quieres navegar
  }
}
