import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktopageComponent } from './backtopage.component';

describe('BacktopageComponent', () => {
  let component: BacktodashboardComponent;
  let fixture: ComponentFixture<BacktodashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacktopageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacktopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
