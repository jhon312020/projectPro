import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroppedRequestComponent } from './dropped-request.component';

describe('DroppedRequestComponent', () => {
  let component: DroppedRequestComponent;
  let fixture: ComponentFixture<DroppedRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DroppedRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DroppedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
