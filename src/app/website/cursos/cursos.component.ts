import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent  implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateTo(course: string) {
    this.router.navigate([course]);
  }

}
