import {Component, OnInit} from '@angular/core';
import { UserService } from '../../../services/user.service';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
declare var bootstrap: any;

@Component({
  selector: 'app-admin-persons',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    FormsModule,
    NgIf],
  templateUrl: './admin-persons.component.html',
  styleUrl: './admin-persons.component.scss'
})
export class AdminPersonsComponent implements OnInit {

  persons: any[] = [];
  selectedPerson: any = {};
  newPerson: any = {};
  toastClass: string = '';
  toastMessage: string = '';
  toastTitle: string = '';
  courses: any[] = [];
  selectedCourseId: string = '';
  temporalID: string = '';

  constructor(private studentsService: UserService) { }

  ngOnInit(): void {
    this.loadPersons();
    this.loadCourses();
  }

  loadPersons() {
    this.studentsService.getAllPersons().subscribe(persons => {
      console.log(persons);
    });

    this.studentsService.getAllPersons().subscribe((data: any) => {
      this.persons = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
    });
  }
  loadCourses() {
    this.studentsService.getAllCourses().subscribe((data: any) => {
      this.courses = Object.keys(data).map(key => ({
        id: key,
        name: data[key].name,
        version: data[key].version,
        start_date: data[key].start_date,
        label: `${data[key].name} - ${data[key].version} - ${data[key].start_date}`
      }));
    });
  }

  deletePerson(person: any) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${person.name}?`)) {
      this.studentsService.deletePerson(person.id).subscribe(() => {
        this.persons = this.persons.filter(s => s.id !== person.id);
        console.log(`Persona ${person.name} eliminado.`);
        this.showToast('Eliminado', 'El registro ha sido eliminado.', 'danger');

      });
    }
  }

  updatePerson() {
    const updatedData = {
      name: this.selectedPerson.name,
      phone: this.selectedPerson.phone,
      email: this.selectedPerson.email,
      contacted: this.selectedPerson.contacted,
      message: this.selectedPerson.message
    };

    this.studentsService.updatePerson(this.selectedPerson.id, updatedData).subscribe(response => {
      console.log('Persona actualizado:', response);
      this.loadPersons();
    });

    const modalElement = document.getElementById('editPersonModal');
    const modal = bootstrap.Modal.getInstance(modalElement!);
    modal.hide();
    this.showToast('Actualizado', 'El registro ha sido actualizado.', 'info');
  }

  openEditModal(person: any) {
    this.selectedPerson = { ...person };
    const modalElement = document.getElementById('editPersonModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }
  openAddModal() {
    this.newPerson = {};
    const modalElement = document.getElementById('addPersonModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }
  openEnrollModal(person: any) {
    this.selectedPerson = { ...person };
    const modalElement = document.getElementById('enrollPersonModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }

  addStudent() {
    const studentData = {
      name: this.selectedPerson.name,
      lastName: this.selectedPerson.lastName,
      ci: this.selectedPerson.ci,
      email: this.selectedPerson.email,
      phone: this.selectedPerson.phone,
      courses: [this.selectedCourseId]
    };

    this.studentsService.addStudent(studentData).subscribe(response => {
      this.temporalID = response.name;
      console.log(this.temporalID);

      const modalElement = document.getElementById('enrollPersonModal');
      const modal = bootstrap.Modal.getInstance(modalElement!);
      modal.hide();
      this.showToast('Registrado', 'Estudiante registro añadido con éxito.', 'success');
      this.studentsService.deletePerson(this.selectedPerson.id).subscribe(() => {
        this.persons = this.persons.filter(s => s.id !== this.selectedPerson.id);
      });
    });
  }

  addPerson() {
    this.studentsService.addPerson(this.newPerson).subscribe(response => {
      console.log('Nueva persona añadido:', response);
      this.loadPersons();
      const modalElement = document.getElementById('addPersonModal');
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
