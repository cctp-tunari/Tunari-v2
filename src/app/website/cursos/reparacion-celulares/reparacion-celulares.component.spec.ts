import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparacionCelularesComponent } from './reparacion-celulares.component';

describe('ReparacionCelularesComponent', () => {
  let component: ReparacionCelularesComponent;
  let fixture: ComponentFixture<ReparacionCelularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReparacionCelularesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReparacionCelularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
