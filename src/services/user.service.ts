import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@angular/fire/auth";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private isAdmin = false;
    private eventSubject = new Subject<any>();
    public eventObservable$ = this.eventSubject.asObservable();



    constructor(private auth: Auth, private http: HttpClient) {}


    setAuthentication(admin: boolean) {
        this.isAdmin = true;
    }

    getAuthentication(admin: boolean) {
        return this.isAdmin;
    }

    register(email:any,password:any){
        // console.log('--->', email , password)
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    login(email:any,password:any) {
        return signInWithEmailAndPassword( this.auth, email, password)
    }

    emitEvent(data: any) {
        this.eventSubject.next(data);
        console.log('data:', data)
    }

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
