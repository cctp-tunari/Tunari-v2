import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastronomiaVirtualComponent } from './gastronomia-virtual.component';

describe('GastronomiaVirtualComponent', () => {
  let component: GastronomiaVirtualComponent;
  let fixture: ComponentFixture<GastronomiaVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastronomiaVirtualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastronomiaVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
