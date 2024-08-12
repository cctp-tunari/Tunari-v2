import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.scss'
})

export class IniciarSesionComponent {

  public email: any = "";
  public password: any = "";
  public showAlert = false;
  public message: any;



  constructor(private router: Router, private appComponent: AppComponent, private userService: UserService) {}

  onLogin() {
    console.log('click ', this.email, this.password)
    this.userService.login(this.email,this.password)
      .then(response => {
        this.userService.setAuthentication(true);
        this.userService.emitEvent(true);
        this.router.navigate(['/admin']);

      })
      .catch(error => {
        console.log(error);
        this.openErrorAlert()

      })

    // Aquí puedes agregar la lógica para validar el formulario y autenticar al usuario
    // this.appComponent.setLoginStatus(true); // Actualiza el estado de autenticación
    // // Redirigir a la página de administración
    // this.router.navigate(['/admin']); // Cambia '/admin' por la ruta a la que quieres navegar
  }


  add(){
    // console.log('click')
    let email= "a@gmail.com";
    let password= "123456789";
    this.userService.register(email,password);
  }

  closeAlert() {
    this.showAlert = false;
  }

  openErrorAlert() {
    this.showAlert = true;
    setTimeout(() => {
      this.closeAlert();
    }, 4000); 
  }
}
