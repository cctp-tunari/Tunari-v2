import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-convenios',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './convenios.component.html',
  styleUrl: './convenios.component.scss'
})
export class ConveniosComponent {
  public particles = new Array(40);

}
