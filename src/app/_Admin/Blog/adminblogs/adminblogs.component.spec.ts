import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminblogsComponent } from './adminblogs.component';

describe('AdminblogsComponent', () => {
  let component: AdminblogsComponent;
  let fixture: ComponentFixture<AdminblogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminblogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminblogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
