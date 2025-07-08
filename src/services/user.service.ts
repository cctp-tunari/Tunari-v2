import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, authState } from "@angular/fire/auth";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { browserLocalPersistence, getAuth, setPersistence, signOut } from "firebase/auth";
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { getDatabase, ref, get, set } from 'firebase/database';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private isAdmin = false;
  private eventSubject = new Subject<any>();
  public eventObservable$ = this.eventSubject.asObservable();
  public auxUser: any = "";

  private adminStatusChecked = false;
  private isSuperAdminCached = false;



  constructor(private auth: Auth, private http: HttpClient, private router: Router) {
    //TODO: (refactor)
    setPersistence(this.auth, browserLocalPersistence)
      .then(() => {
        console.log("Now the currentUser will be persisted across page reloads")
      })
      .catch((error) => {
        console.log('Error setting persistence:', error);
      });
  }


  setAuthentication(admin: boolean) {
    this.isAdmin = true;
  }

  getAuthentication() {
    return this.isAdmin;
  }


  login(email: any, password: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((response) => {
        const user = response.user;
        return user.getIdToken().then((token) => {
          localStorage.setItem('userToken', token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.auxUser = user;

          // Verificar si está en la lista de admins
          const db = getDatabase();
          const adminRef = ref(db, `admins/${user.uid}`);
          return get(adminRef).then(snapshot => {
            const isAdmin = snapshot.exists();
            this.setAuthentication(isAdmin);
            this.emitEvent(true);
            this.router.navigate(['/admin']);
          });
        });
      });
  }

  emitEvent(data: any) {
    this.eventSubject.next(data);
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('currentUser');

      this.adminStatusChecked = false;
      this.isSuperAdminCached = false;

      this.setAuthentication(false);
      this.emitEvent(false);
      this.router.navigate(['/home']);
    }).catch((error) => {
      console.log('Error during logout:', error);
    });
  }

  checkSessionStatus(): Promise<boolean> {
    return new Promise((resolve) => {
      const storedToken = localStorage.getItem('userToken');
      if (storedToken) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }


  checkAdminStatus(uidFromStorage?: string): Promise<boolean> {
    const uid = uidFromStorage || this.auth.currentUser?.uid;
    if (!uid) {
      console.warn('[checkAdminStatus] UID es null o undefined');
      return Promise.resolve(false);
    }
    const db = getDatabase();
    const adminRef = ref(db, `admins/${uid}`);
    return get(adminRef)
      .then(snapshot => {
        if (!snapshot.exists()) {

          return false;
        }
        const adminData = snapshot.val();
        const isSuperAdmin = adminData.superAdmin === true;
        return isSuperAdmin;
      })
      .catch((err) => {
        console.error('[checkAdminStatus] Error leyendo Realtime DB:', err);
        return false;
      });
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }



  async register(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  }



  async addAdminToDatabase(email: string): Promise<void> {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) throw new Error('No hay usuario activo');

    const db = getDatabase();
    const uid = user.uid;
    const adminRef = ref(db, `admins/${uid}`);

    await set(adminRef, {
      email,
      createdAt: Date.now(),
      superAdmin: false  // Por defecto, no es super admin
    });
  }

  // async checkAdminAccess(): Promise<boolean> {
  //   const user = this.auth.currentUser;
  //   

  //   if (!user) {
  //     console.warn('[checkAdminAccess] No hay usuario activo');
  //     return false;
  //   }

  //   if (this.adminStatusChecked) {
  //     console.log('[checkAdminAccess] Usando cache:', this.isSuperAdminCached);
  //     return this.isSuperAdminCached;
  //   }

  //   const db = getDatabase();
  //   const adminRef = ref(db, `admins/${user.uid}`);
  //   console.log('[checkAdminAccess] Revisando admin en:', `admins/${user.uid}`);

  //   try {
  //     const snapshot = await get(adminRef);
  //     console.log('[checkAdminAccess] Existe en admins?', snapshot.exists());
  //     console.log('[checkAdminAccess] Datos:', snapshot.val());

  //     const isAdmin = snapshot.exists() && snapshot.val()?.superAdmin === true;

  //     // Cachear resultado
  //     this.adminStatusChecked = true;
  //     this.isSuperAdminCached = isAdmin;

  //     return isAdmin;
  //   } catch (err) {
  //     console.error('[checkAdminAccess] Error leyendo la base de datos:', err);
  //     return false;
  //   }
  // }


  checkAdminAccess(): Promise<boolean> {
    return new Promise((resolve) => {
      authState(this.auth).subscribe(async (user) => {
        if (!user) {
          resolve(false);
          return;
        }
        const db = getDatabase();
        const adminRef = ref(db, `admins/${user.uid}`);
        try {
          const snapshot = await get(adminRef);
          if (!snapshot.exists()) {
            resolve(false);
            return;
          }
          const data = snapshot.val();
          resolve(data.superAdmin === true);
        } catch {
          resolve(false);
        }
      });
    });
  }

  //TODO: (refactor) to student service

  private apiUrl = 'https://tunari-65fdc-default-rtdb.firebaseio.com/Student';

  getAllStudents(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}.json`);
  }
  addStudent(student: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}.json`, student);
  }
  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}.json`);
  }
  updateStudent(id: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}.json`, updatedData);
  }

}
