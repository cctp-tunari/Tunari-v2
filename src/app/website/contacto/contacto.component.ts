import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { StudentService } from '../../../services/student.service';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent {
  newStudent: any = {
    name: '',
    email: '',
    phone: '',
    message: '',
    contacted: 'false'
  };
  successMessage: string = '';
  constructor(private studentsService: UserService) { }
  onSubmit() {
    console.log('Formulario enviado:', this.newStudent);

    this.studentsService.addStudent(this.newStudent).subscribe(response => {
      console.log('Estudiante agregado:', response);
      this.successMessage = 'Mensaje enviado correctamente.'; // Mostrar mensaje de éxito
      this.newStudent = {
        name: '',
        email: '',
        phone: '',
        message: '',
        contacted: 'false'
      };
      setTimeout(() => {
        this.successMessage = '';
      }, 5000);
    });
  }
}
