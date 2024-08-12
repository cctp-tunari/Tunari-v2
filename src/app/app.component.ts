import { Component , HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';


import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { Toolbar3Component } from './website/shared/toolbar3/toolbar3.component';
import { FooterComponent } from './website/shared/footer/footer.component';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AdminFooterComponent, AdminHeaderComponent, Toolbar3Component,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  public title = 'tunari';
  public isLoggedIn: boolean = false;


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router, private userService: UserService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({
            top: 0,
            behavior: 'auto'
          });
        }
      });
  }

  ngOnInit() {

    this.subscription = this.userService.eventObservable$.subscribe (data => {
      this.isLoggedIn = data
    });
  }


  ngOnDestroy() {
    // Desuscribirse para evitar fugas de memoria
    this.subscription.unsubscribe();
  }

  // setLoginStatus(status: boolean) {
  //   this.isLoggedIn = status;
  // }


}
