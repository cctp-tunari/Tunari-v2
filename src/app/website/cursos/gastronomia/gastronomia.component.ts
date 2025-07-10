import { Component, OnInit, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
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
export class GastronomiaComponent implements OnInit, AfterViewInit {

  @ViewChild('videoRef') video!: ElementRef<HTMLVideoElement>;
  currentQuestion: number = 1;

  // constructor() { }

  ngOnInit(): void {
    // this.checkVisibility();
  }

  ngAfterViewInit(): void {
    // Asegura que el video esté muteado desde el código
    if (this.video?.nativeElement) {
      this.video.nativeElement.muted = true;
    }
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
