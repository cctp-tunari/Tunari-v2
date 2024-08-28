import {Component, OnInit} from '@angular/core';
import { UserService } from '../../../services/user.service';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
declare var bootstrap: any;

@Component({
  selector: 'app-admin-courses',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    FormsModule,
    NgIf],
  templateUrl: './admin-courses.component.html',
  styleUrl: './admin-courses.component.scss'
})
export class AdminCoursesComponent implements OnInit {

  courses: any[] = [];
  selectedCourse: any = {};
  newCourse: any = {};
  toastClass: string = '';
  toastMessage: string = '';
  toastTitle: string = '';

  constructor(private studentsService: UserService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.studentsService.getAllCourses().subscribe(courses => {
      console.log(courses);
    });

    this.studentsService.getAllCourses().subscribe((data: any) => {
      this.courses = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
    });
  }

  deleteCourse(course: any) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${course.name}?`)) {
      this.studentsService.deleteCourse(course.id).subscribe(() => {
        this.courses = this.courses.filter(s => s.id !== course.id);
        console.log(`Curso ${course.name} eliminado.`);
        this.showToast('Eliminado', 'El registro ha sido eliminado.', 'danger');

      });
    }
  }

  updateCourse() {
    const updatedData = {
      name: this.selectedCourse.name,
      version: this.selectedCourse.version,
      start_date: this.selectedCourse.start_date,
      info: this.selectedCourse.info,
      status: this.selectedCourse.status
    };

    this.studentsService.updateCourse(this.selectedCourse.id, updatedData).subscribe(response => {
      console.log('Curso actualizado:', response);
      this.loadCourses();
    });

    const modalElement = document.getElementById('editCourseModal');
    const modal = bootstrap.Modal.getInstance(modalElement!);
    modal.hide();
    this.showToast('Actualizado', 'El registro ha sido actualizado.', 'info');
  }

  openEditModal(course: any) {
    this.selectedCourse = { ...course };
    const modalElement = document.getElementById('editCourseModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }
  openAddModal() {
    this.newCourse = {};
    const modalElement = document.getElementById('addCourseModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }

  addCourse() {
    this.studentsService.addCourse(this.newCourse).subscribe(response => {
      console.log('Nuevo curso añadido:', response);
      this.loadCourses();

      // Cierra el modal
      const modalElement = document.getElementById('addCourseModal');
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
}
