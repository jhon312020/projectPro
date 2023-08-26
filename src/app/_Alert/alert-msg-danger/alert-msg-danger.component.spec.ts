import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMsgDangerComponent } from './alert-msg-danger.component';

describe('AlertMsgDangerComponent', () => {
  let component: AlertMsgDangerComponent;
  let fixture: ComponentFixture<AlertMsgDangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertMsgDangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertMsgDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
