import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMsgSuccessComponent } from './alert-msg-success.component';

describe('AlertMsgSuccessComponent', () => {
  let component: AlertMsgSuccessComponent;
  let fixture: ComponentFixture<AlertMsgSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertMsgSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertMsgSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
