import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaFiletMignonComponent } from './receta-filet-mignon.component';

describe('RecetaFiletMignonComponent', () => {
  let component: RecetaFiletMignonComponent;
  let fixture: ComponentFixture<RecetaFiletMignonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetaFiletMignonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetaFiletMignonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
