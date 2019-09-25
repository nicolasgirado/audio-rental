import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UdcsComponent } from './udcs.component';

describe('UdcsComponent', () => {
  let component: UdcsComponent;
  let fixture: ComponentFixture<UdcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
