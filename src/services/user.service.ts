import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@angular/fire/auth";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { browserLocalPersistence, getAuth, setPersistence, signOut } from "firebase/auth";
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private isAdmin = false;
    private eventSubject = new Subject<any>();
    public eventObservable$ = this.eventSubject.asObservable();
    public auxUser: any = "";



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

    register(email:any,password:any){
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    login(email: any, password: any) {
        console.log("usuario: ",this.auxUser)
        return signInWithEmailAndPassword(this.auth, email, password)
          .then((response) => {
            response.user.getIdToken().then((token) => {
              localStorage.setItem('userToken', token);
              localStorage.setItem('currentUser', JSON.stringify(this.auth.currentUser));

              this.setAuthentication(true);
              this.emitEvent(true);
              this.auxUser = this.auth.currentUser
              this.router.navigate(['/admin']);
            });
          });
      }

    emitEvent(data: any) {
        this.eventSubject.next(data);
        console.log('data:', data)
    }

    logout() {
        const auth = getAuth();
        signOut(auth).then(() => {
          localStorage.removeItem('userToken');
          localStorage.removeItem('currentUser');

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
    });}

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
