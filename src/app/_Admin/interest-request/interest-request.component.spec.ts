import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedRequestComponent } from './interested-request.component';

describe('InterestedRequestComponent', () => {
  let component: InterestedRequestComponent;
  let fixture: ComponentFixture<InterestedRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestedRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
