import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UdcDialogComponent } from './udc-dialog.component';

describe('UdcDialogComponent', () => {
  let component: UdcDialogComponent;
  let fixture: ComponentFixture<UdcDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdcDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdcDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
