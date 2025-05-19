import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduadosComponent } from './graduados.component';

describe('GraduadosComponent', () => {
  let component: GraduadosComponent;
  let fixture: ComponentFixture<GraduadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraduadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraduadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
