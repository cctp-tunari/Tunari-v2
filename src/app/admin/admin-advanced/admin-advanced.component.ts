import { Component, OnInit } from '@angular/core';

import { getDatabase, ref, get, set, remove, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.servece';
import { CommonModule } from '@angular/common';

interface AdminUser {
  uid: string;
  email: string;
  createdAt: number;
}

interface AddAdminResult {
  success: boolean;
  message: string;
  uid?: string;
}


@Component({
  selector: 'app-admin-advanced',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-advanced.component.html',
  styleUrl: './admin-advanced.component.scss'
})



export class AdminAdvancedComponent implements OnInit{

  admins: AdminUser[] = [];
  newAdminEmail: string = '';
  statusMessage: string = '';
  isLoading: boolean = false;

  constructor(private adminService: AdminService) {}

ngOnInit(): void {
  this.loadAdmins();
}

loadAdmins() {
  this.adminService.getAllAdmins().then((data) => {
    this.admins = data;
    console.log('admins--> ',data)
    console.log(this.admins)
  });
}

addAdmin() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!this.newAdminEmail || !emailRegex.test(this.newAdminEmail)) {
    this.statusMessage = 'Ingresa un correo válido.';
    return;
  }

  this.isLoading = true;
  this.statusMessage = 'Buscando usuario...';

  this.adminService.addAdminByEmail(this.newAdminEmail).then(result => {
    if (!result.success) {
      this.statusMessage = result.message;
    } else {
      this.statusMessage = 'Admin agregado correctamente.';
      this.newAdminEmail = '';
    }
    this.isLoading = false;
  });
}


removeAdmin(uid: string) {
  this.adminService.deleteAdmin(uid).then(() => {
    this.statusMessage = 'Admin eliminado correctamente.';
    this.loadAdmins(); // refrescar lista
  });
}
}
