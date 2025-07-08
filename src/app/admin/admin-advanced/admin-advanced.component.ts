import { Component, OnInit } from '@angular/core';

import { getDatabase, ref, get, set, remove, onValue, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.servece';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';

interface AdminUser {
  uid: string;
  email: string;
  createdAt: number;
  superAdmin: boolean;
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



export class AdminAdvancedComponent implements OnInit {

  admins: AdminUser[] = [];
  newAdminEmail: string = '';
  statusMessage: string = '';
  isLoading: boolean = false;

  constructor(private adminService: AdminService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.getAllAdmins().then((data) => {
      this.admins = data;
    });
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  toggleSuperAdmin(uid: string, event: Event) {
    const isSuper = (event.target as HTMLInputElement)?.checked ?? false
    const db = getDatabase();
    const adminRef = ref(db, `admins/${uid}`);

    update(adminRef, { superAdmin: isSuper })
      .then(() => {
        this.statusMessage = `Permiso actualizado: ${isSuper ? 'Super Admin' : 'Básico'}`;
        this.loadAdmins();
      })
      .catch((error) => {
        console.error('Error al actualizar permisos:', error);
        this.statusMessage = 'Error al actualizar permiso.';
      });
  }

  async addAdmin() {
    const email = this.newAdminEmail?.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      this.statusMessage = 'Ingresa un correo válido.';
      return;
    }

    const defaultPassword = this.generateDefaultPassword(email);

    this.isLoading = true;
    this.statusMessage = 'Creando administrador...';

    try {
      // Crear usuario en Auth
      await this.userService.register(email, defaultPassword);

      // Guardar en Realtime Database
      await this.userService.addAdminToDatabase(email);

      this.statusMessage = `Admin creado. Contraseña: ${defaultPassword} ⚠️ Guárdala ahora.`;
      this.newAdminEmail = '';
      this.loadAdmins();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        // this.statusMessage = 'El correo ya está registrado.';
        try {
          await this.adminService.restoreAdminFromBackup(email);
          this.statusMessage = 'Administrador restaurado desde respaldo.';
          this.newAdminEmail = '';
          this.loadAdmins();
        } catch {
          this.statusMessage = 'El correo ya está registrado y no se pudo restaurar.';
        }
      } else {
        this.statusMessage = 'Error al crear el administrador.';
      }
    }

    this.isLoading = false;
  }

  generateDefaultPassword(email: string): string {
    const username = email.split('@')[0];
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    return `${username}${randomNumbers}`;
  }

  confirmDeleteAdmin(uid: string, email: string) {
    const confirm = window.confirm(`¿Estás seguro de eliminar al admin: ${email}?`);

    if (!confirm) return;

    this.adminService.softDeleteAdmin(uid, email)
      .then(() => {
        this.statusMessage = 'Administrador eliminado correctamente.';
        this.loadAdmins();
      })
      .catch(err => {
        console.error(err);
        this.statusMessage = 'Error al eliminar administrador.';
      });
  }

  promoteToSuperAdmin(uid: string) {
    const db = getDatabase();
    const adminRef = ref(db, `admins/${uid}`);

    update(adminRef, { superAdmin: true })
      .then(() => {
        this.statusMessage = 'Usuario promovido a super admin.';
        this.loadAdmins();
      })
      .catch((error) => {
        console.error('Error al promover:', error);
        this.statusMessage = 'Error al promover a super admin.';
      });
  }


}
