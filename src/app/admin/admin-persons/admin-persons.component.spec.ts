import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonsComponent } from './admin-persons.component';

describe('AdminPersonsComponent', () => {
  let component: AdminPersonsComponent;
  let fixture: ComponentFixture<AdminPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPersonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
