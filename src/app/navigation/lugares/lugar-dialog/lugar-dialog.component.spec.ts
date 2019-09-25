import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LugarDialogComponent } from './lugar-dialog.component';

describe('LugarDialogComponent', () => {
  let component: LugarDialogComponent;
  let fixture: ComponentFixture<LugarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LugarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LugarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
