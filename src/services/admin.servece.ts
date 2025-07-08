import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
import { Observable } from 'rxjs';
import { createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';

interface AddAdminResult {
  success: boolean;
  message: string;
  uid?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // const auth = getAuth();
  private db = getDatabase();
  private adminPath = 'admins';
  private apiKey = 'AIzaSyC0GpkiZ4KcT6GvGZ4arJh-cCt2Agarbkc';

  constructor(private http: HttpClient) { }

  // Obtener todos los administradores
  async getAllAdmins(): Promise<any[]> {
    const adminRef = ref(this.db, this.adminPath);
    const snapshot = await get(adminRef);
    const data = snapshot.val();
    const result: any[] = [];

    if (data) {
      for (const uid in data) {
        result.push({ uid, ...data[uid] });
      }
    }

    return result;
  }

  // Agregar admin desde un correo (obteniendo UID primero)
  async addAdminByEmail(email: string): Promise<AddAdminResult> {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.warn("No hay usuario autenticado");
      return { success: false, message: 'Correo no encontrado en Firebase Auth' };;
    }
    const idToken = await currentUser.getIdToken();
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${this.apiKey}`;

    const res = await this.http
      .post<any>(url, { idToken })  // aquí va el token
      .toPromise()
      .catch((error) => {
        console.error('Error al obtener datos:', error);
        return { success: false, message: 'Correo no encontrado en Firebase Auth' };;
      });

    if (!res?.users) return { success: false, message: 'Correo no encontrado en Firebase Auth' };;

    const matchedUser = res.users.find((u: any) => u.email === email);
    const uid = matchedUser?.localId;

    if (!uid) return { success: false, message: 'Correo no encontrado en Firebase Auth' };;
    const db = getDatabase();
    const adminRef = ref(db, `admins/${uid}`);
    const createdAt = Date.now();
    await set(adminRef, { email, createdAt });
    //   return uid;
    return { success: true, message: 'Admin agregado', uid };
  }

  // Eliminar un admin por UID
  // async deleteAdmin(uid: string): Promise<void> {
  //   const adminRef = ref(this.db, `${this.adminPath}/${uid}`);
  //   await remove(adminRef);
  // }

  async deleteAdmin(uid: string, email: string): Promise<void> {
    const adminRef = ref(this.db, `admins/${uid}`);
    const backupRef = ref(this.db, `backupAdmins/${email.replace('.', '_')}`);

    // Obtener los datos actuales del admin
    const snapshot = await get(adminRef);
    if (snapshot.exists()) {
      const adminData = snapshot.val();

      // Guardar backup con el email como clave (sin puntos)
      await set(backupRef, {
        uid,
        email,
        backupAt: Date.now(),
        ...adminData
      });

      // Eliminar de admins
      await remove(adminRef);
    }
  }

  async softDeleteAdmin(uid: string, email: string): Promise<void> {
    const adminRef = ref(this.db, `admins/${uid}`);
    const backupRef = ref(this.db, `backupAdmins/${this.emailToKey(email)}`);

    // Mover datos a backup
    const snapshot = await get(adminRef);
    if (snapshot.exists()) {
      const adminData = snapshot.val();
      await set(backupRef, { ...adminData, uid });
      await remove(adminRef); // Eliminar de admins
    }
  }

  async restoreAdminFromBackup(email: string): Promise<void> {
    const key = this.emailToKey(email);
    const backupRef = ref(this.db, `backupAdmins/${key}`);
    const snapshot = await get(backupRef);

    if (!snapshot.exists()) throw new Error('No se encontró respaldo');

    const adminData = snapshot.val();
    const uid = adminData.uid;

    const adminRef = ref(this.db, `admins/${uid}`);
    await set(adminRef, {
      email: adminData.email,
      createdAt: Date.now(),
      superAdmin: false,
    });

    await remove(backupRef); // Limpieza
  }

  emailToKey(email: string): string {
    return email.replace(/\./g, '_');
  }



}
