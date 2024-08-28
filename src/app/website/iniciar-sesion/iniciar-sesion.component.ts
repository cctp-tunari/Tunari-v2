import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { StudentService } from '../../../services/student.service';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.scss'
})

export class IniciarSesionComponent {

  public email: any = "";
  public password: any = "";
  public showAlert = false;
  public message: any;
  



  constructor(private router: Router, private appComponent: AppComponent, private userService: UserService, private studentService: StudentService) {}

  onLogin() {
    this.userService.login(this.email, this.password)
      .then(() => {
        // this.router.navigate(['/admin']);
      })
      .catch(error => {
        console.log(error);
        this.openErrorAlert();
      });
  }


  add(){
    // console.log('click')
    let email= "a@gmail.com";
    let password= "123456789";
    this.userService.register(email,password);
  }

  closeAlert() {
    this.showAlert = false;
  }

  openErrorAlert() {
    this.showAlert = true;
    setTimeout(() => {
      this.closeAlert();
    }, 4000); 
  }

  test(){
    
    let student ={
      name: "Juan",
      message: "Quiero saber mas sobre las clases",
      contacted: "false"
    }
    this.studentService.addStudent(student).subscribe(response=> {
      console.log(response)
    })
  }


  list() {
    this.studentService.getAllStudents().subscribe(response=> {
      console.log(response)
    })
  } 
  get() {

  } 
  update() {

  } 
  delete() {

  } 
}


