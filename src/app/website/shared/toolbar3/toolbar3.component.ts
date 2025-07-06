import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar3.component.html',
  styleUrl: './toolbar3.component.scss'
})
export class Toolbar3Component implements OnInit, OnDestroy {

  private subscription!: Subscription;
  public isLoggedIn: boolean = false;
  public isAdmin: boolean = false;


  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // 🔁 Escuchar cambios de sesión (login/logout)
    this.subscription = this.userService.eventObservable$.subscribe((data) => {
      this.isLoggedIn = data;

      if (this.isLoggedIn) {
        this.loadAdminStatus();
      } else {
        this.isAdmin = false;
      }
    });

    // 🚀 Verificación inicial si ya está logueado por localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const uid = JSON.parse(storedUser).uid;
      this.isLoggedIn = true;
      this.loadAdminStatus(uid);
    }
  }

  loadAdminStatus(uidFromStorage?: string) {
    this.userService.checkAdminStatus(uidFromStorage).then((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }
  ngOnDestroy(){   
    this.subscription.unsubscribe();
  } 

  onLogout() {
    this.userService.logout();
  }

}
