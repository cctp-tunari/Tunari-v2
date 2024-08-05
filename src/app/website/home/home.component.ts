 import { Component, OnInit } from '@angular/core';
//  import {HeaderComponent} from "../shared/header/header.component";
 import {FooterComponent} from "../shared/footer/footer.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        // HeaderComponent,
        FooterComponent,
        CommonModule
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  
  constructor(private router: Router) {}

  ngOnInit(): void {

  }

  navigateTo(course: string) {
    this.router.navigate([course]);
  }

}
