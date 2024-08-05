import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocteleriaComponent } from './cocteleria.component';

describe('CocteleriaComponent', () => {
  let component: CocteleriaComponent;
  let fixture: ComponentFixture<CocteleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocteleriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocteleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
