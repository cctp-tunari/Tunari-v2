import { Component, OnInit, HostListener } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-gastronomia',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './gastronomia.component.html',
  styleUrl: './gastronomia.component.scss'
})
export class GastronomiaComponent implements OnInit {

  currentQuestion: number = 1;

  // constructor() { }

  ngOnInit(): void {
    // this.checkVisibility();
  }

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll() {
  //   this.checkVisibility();
  // }

  // // checkVisibility() {
  // //   const elements = document.querySelectorAll('.fade-in');
  // //   elements.forEach((element: Element) => {
  // //     const rect = element.getBoundingClientRect();
  // //     if (rect.top < window.innerHeight) {
  // //       element.classList.add('visible');
  // //     }
  // //   });
  // // }

  // showInfo() {
  //   alert("Pon a prueba tus conocimientos.");
  // }

  // nextQuestion() {
  //   if (this.currentQuestion < 4) {
  //     this.currentQuestion++;
  //   }
  // }

  // previousQuestion() {
  //   if (this.currentQuestion > 1) {
  //     this.currentQuestion--;
  //   }
  // }
}
