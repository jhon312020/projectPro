import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrestedFormComponent } from './intrested-form.component';

describe('IntrestedFormComponent', () => {
  let component: IntrestedFormComponent;
  let fixture: ComponentFixture<IntrestedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntrestedFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntrestedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
