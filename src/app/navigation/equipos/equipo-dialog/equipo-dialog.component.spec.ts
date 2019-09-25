import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoDialogComponent } from './equipo-dialog.component';

describe('EquipoDialogComponent', () => {
  let component: EquipoDialogComponent;
  let fixture: ComponentFixture<EquipoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
