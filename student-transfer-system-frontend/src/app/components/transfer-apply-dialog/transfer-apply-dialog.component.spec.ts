import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferApplyDialogComponent } from './transfer-apply-dialog.component';

describe('TransferApplyDialogComponent', () => {
  let component: TransferApplyDialogComponent;
  let fixture: ComponentFixture<TransferApplyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferApplyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferApplyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
