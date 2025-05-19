import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Toolbar3Component } from './toolbar3.component';

describe('Toolbar3Component', () => {
  let component: Toolbar3Component;
  let fixture: ComponentFixture<Toolbar3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toolbar3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Toolbar3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
