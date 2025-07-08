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



export class AdminAdvancedComponent implements OnInit{

  admins: AdminUser[] = [];
  newAdminEmail: string = '';
  statusMessage: string = '';
  isLoading: boolean = false;

  constructor(private adminService: AdminService, private userService: UserService) {}

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

// addAdmin() {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!this.newAdminEmail || !emailRegex.test(this.newAdminEmail)) {
//     this.statusMessage = 'Ingresa un correo válido.';
//     return;
//   }

//   this.isLoading = true;
//   this.statusMessage = 'Buscando usuario...';

//   this.adminService.addAdminByEmail(this.newAdminEmail).then(result => {
//     if (!result.success) {
//       this.statusMessage = result.message;
//     } else {
//       this.statusMessage = 'Admin agregado correctamente.';
//       this.newAdminEmail = '';
//     }
//     this.isLoading = false;
//   });
// }

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
        this.loadAdmins(); // Actualiza la tabla
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

  // Generar contraseña por defecto
  // const username = email.split('@')[0];
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
      this.statusMessage = 'El correo ya está registrado.';
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

// removeAdmin(uid: string) {
//   // this.userService.testRemove(uid);
//   if (confirm('¿Estás seguro de que quieres eliminar este administrador?')) {
//     this.adminService.deleteAdmin(uid).then(() => {
//       this.statusMessage = 'Administrador eliminado.';
//       this.loadAdmins(); // recargar lista
//     }).catch(err => {
//       this.statusMessage = 'Error al eliminar admin.';
//       console.error(err);
//     });
//   }
// }

confirmDeleteAdmin(uid: string, email: string) {
  const confirm = window.confirm(`¿Estás seguro de eliminar al admin: ${email}?`);

  if (!confirm) return;

  this.adminService.deleteAdmin(uid)
    .then(() => {
      this.statusMessage = 'Administrador eliminado correctamente.';
      this.loadAdmins();  // recargar la tabla
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
      this.loadAdmins(); // Recarga la tabla para reflejar cambios
    })
    .catch((error) => {
      console.error('Error al promover:', error);
      this.statusMessage = 'Error al promover a super admin.';
    });
}


}
