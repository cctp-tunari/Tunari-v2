import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private auth: Auth) {}


    register(email:any,password:any){
        // console.log('--->', email , password)
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    login(email:any,password:any) {
        return signInWithEmailAndPassword( this.auth, email, password)
    }

}