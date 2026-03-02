import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterChoiceDialogComponent } from './register-choice-dialog.component';

describe('RegisterChoiceDialogComponent', () => {
  let component: RegisterChoiceDialogComponent;
  let fixture: ComponentFixture<RegisterChoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterChoiceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterChoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
