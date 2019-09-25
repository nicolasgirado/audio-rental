import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonDialogComponent } from './salon-dialog.component';

describe('SalonDialogComponent', () => {
  let component: SalonDialogComponent;
  let fixture: ComponentFixture<SalonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
