import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDownloadRequestComponent } from './approve-download-request.component';

describe('ApproveDownloadRequestComponent', () => {
  let component: AproveDownloadRequestComponent;
  let fixture: ComponentFixture<AproveDownloadRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDownloadRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveDownloadRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
