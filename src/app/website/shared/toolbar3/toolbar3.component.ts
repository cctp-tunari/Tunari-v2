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

  constructor(private userService: UserService) {
    this.userService.checkSessionStatus().then(isActive => {
      this.isLoggedIn = isActive;
    })
  }

  ngOnInit() {
 
    this.subscription = this.userService.eventObservable$.subscribe (data => {
      this.isLoggedIn = data
    });
  }

  ngOnDestroy(){   
    this.subscription.unsubscribe();
  } 

  onLogout() {
    this.userService.logout();
  }

}
