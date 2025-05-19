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
  courses = [
    {
      title: 'Gastronomía',
      description: 'Aprende a cocinar platos de alta calidad...',
      imageUrl: 'path-to-image1.jpg',
      isNew: true,
      isPopular: false,
      price: 120
    },
    {
      title: 'Coctelería',
      description: 'Descubre las técnicas de los mejores bartenders...',
      imageUrl: 'path-to-image2.jpg',
      isNew: false,
      isPopular: true,
      price: 150
    },
    {
      title: 'Reparación de Celulares',
      description: 'Conviértete en un experto en reparación de celulares...',
      imageUrl: 'path-to-image3.jpg',
      isNew: false,
      isPopular: false,
      price: 'Gratis',
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateTo(course: string) {
    this.router.navigate([course]);
  }

}
