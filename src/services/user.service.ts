import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@angular/fire/auth";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private isAdmin = false;
    private eventSubject = new Subject<any>();
    public eventObservable$ = this.eventSubject.asObservable();
    


    constructor(private auth: Auth) {}


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

}