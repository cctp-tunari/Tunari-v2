import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseODimensionalComponent } from './diseño-dimensional.component';

describe('DisenhoDimensionalComponent', () => {
  let component: DiseODimensionalComponent;
  let fixture: ComponentFixture<DiseODimensionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiseODimensionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiseODimensionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
