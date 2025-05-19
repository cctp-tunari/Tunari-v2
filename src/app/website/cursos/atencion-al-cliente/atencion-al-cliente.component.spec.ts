import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionAlClienteComponent } from './atencion-al-cliente.component';

describe('AtencionAlClienteComponent', () => {
  let component: AtencionAlClienteComponent;
  let fixture: ComponentFixture<AtencionAlClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtencionAlClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionAlClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
