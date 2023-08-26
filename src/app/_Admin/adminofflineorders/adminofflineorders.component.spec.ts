import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminofflineordersComponent } from './adminofflineorders.component';

describe('AdminofflineordersComponent', () => {
  let component: AdminofflineordersComponent;
  let fixture: ComponentFixture<AdminofflineordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminofflineordersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminofflineordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
