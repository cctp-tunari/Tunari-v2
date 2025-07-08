import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { StudentService } from '../../../services/student.service';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

  public resetMode = false;

  constructor(private router: Router, private appComponent: AppComponent, private userService: UserService, private studentService: StudentService) { }

  async onLogin() {
    try {
      await this.userService.login(this.email, this.password);
      console.log('[onLogin] Iniciando sesión con', this.email);
      // Ahora revisa si tiene acceso
      const isAdmin = await this.userService.checkIfisAdmin();

      if (!isAdmin) {
        // await this.userService.logoutPromise();
        this.userService.logout();
        alert('Tu cuenta no tiene privilegios de administrador. Contacta con el SuperAdmin.');
        this.router.navigate(['/iniciar-sesion']);
      } else {
        this.router.navigate(['/admin']);
      }

    } catch (error) {
      console.error('[onLogin] Error durante el login o validación:', error);
      this.openErrorAlert();
    }

    // this.isLoading = false;
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

  list() {
    this.studentService.getAllStudents().subscribe(response => {
    })
  }
  get() {

  }
  update() {

  }
  delete() {

  }

  sendPasswordReset() {
    if (!this.email) {
      this.message = 'Por favor ingresa tu correo.';
      return;
    }

    this.userService.resetPassword(this.email)
      .then(() => {
        this.message = 'Correo de recuperación enviado. Revisa tu bandeja de entrada.';
        this.resetMode = false;
      })
      .catch(error => {
        console.error(error);
        this.message = 'Error al enviar el correo: ' + error.message;
      });
  }
}


