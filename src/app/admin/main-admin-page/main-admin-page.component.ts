import {Component, OnInit} from '@angular/core';
import { UserService } from '../../../services/user.service';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
declare var bootstrap: any;

@Component({
  selector: 'app-main-admin-page',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    FormsModule,
    NgIf
  ],
  templateUrl: './main-admin-page.component.html',
  styleUrl: './main-admin-page.component.scss'
})
export class MainAdminPageComponent implements OnInit {

  students: any[] = [];
  selectedStudent: any = {};
  newStudent: any = {};
  showAlert: boolean = false;
  toastClass: string = '';
  toastMessage: string = '';
  toastTitle: string = '';

  constructor(private studentsService: UserService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentsService.getAllStudents().subscribe(students => {
      console.log(students);
    });

    this.studentsService.getAllStudents().subscribe((data: any) => {
      this.students = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
    });
  }

  deleteStudent(student: any) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${student.name}?`)) {
      this.studentsService.deleteStudent(student.id).subscribe(() => {
        this.students = this.students.filter(s => s.id !== student.id);
        console.log(`Estudiante ${student.name} eliminado.`);
        this.showToast('Eliminado', 'El registro ha sido eliminado.', 'danger');

      });
    }
  }

  updateStudent() {
    const updatedData = {
      name: this.selectedStudent.name,
      phone: this.selectedStudent.phone,
      email: this.selectedStudent.email,
      contacted: this.selectedStudent.contacted,
      message: this.selectedStudent.message
    };

    this.studentsService.updateStudent(this.selectedStudent.id, updatedData).subscribe(response => {
      console.log('Estudiante actualizado:', response);
      this.loadStudents();
    });

    const modalElement = document.getElementById('editStudentModal');
    const modal = bootstrap.Modal.getInstance(modalElement!);
    modal.hide();
    this.showToast('Actualizado', 'El registro ha sido actualizado.', 'info');
  }

  openEditModal(student: any) {
    this.selectedStudent = { ...student };
    const modalElement = document.getElementById('editStudentModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }
  openAddModal() {
    this.newStudent = {}; // Limpia el formulario para un nuevo registro
    const modalElement = document.getElementById('addStudentModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }

  addStudent() {
    this.studentsService.addStudent(this.newStudent).subscribe(response => {
      console.log('Nuevo estudiante añadido:', response);
      this.loadStudents();

      // Cierra el modal
      const modalElement = document.getElementById('addStudentModal');
      const modal = bootstrap.Modal.getInstance(modalElement!);
      modal.hide();
      this.showToast('Registrado', 'Nuevo registro añadido con éxito.', 'success');
    });
  }

  showToast(title: string, message: string, type: 'success' | 'warning' | 'danger' | 'info' = 'info') {
    this.toastTitle = title;
    this.toastMessage = message;

    // Configura la clase del toast según el tipo
    this.toastClass = `bg-${type} text-white`;

    const toastElement = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastElement!);
    toast.show();
  }

  goToWhatsApp(phone: string) {
    if (phone) {
      const whatsappUrl = `https://wa.me/${phone}`;
      window.open(whatsappUrl, '_blank');
    } else {
      this.showToast('', 'Número no disponible.', 'warning');
    }
  }
}
