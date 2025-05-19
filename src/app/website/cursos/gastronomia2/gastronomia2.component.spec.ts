import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gastronomia2Component } from './gastronomia2.component';

describe('Gastronomia2Component', () => {
  let component: Gastronomia2Component;
  let fixture: ComponentFixture<Gastronomia2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gastronomia2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gastronomia2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
