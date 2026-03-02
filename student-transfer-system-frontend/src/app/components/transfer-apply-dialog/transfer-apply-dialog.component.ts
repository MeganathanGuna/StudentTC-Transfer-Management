import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-transfer-apply-dialog',
  templateUrl: './transfer-apply-dialog.component.html',
  styleUrls: ['./transfer-apply-dialog.component.scss']
})
export class TransferApplyDialogComponent implements OnChanges {

  @Input() studentId!: number;
  @Input() currentSchool!: string;
  @Input() studentName: string = '';   // ← NEW
  @Input() regId: string = '';
  @Output() close = new EventEmitter<boolean>();

  request: any = {
    studentId: 0,
    currentSchool: '',
    targetSchool: '',
    reason: ''
  };

  schools: string[] = [];
  loading = false;

  constructor(private api: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // This runs whenever @Input values change
    if (changes['studentId'] || changes['currentSchool']) {
      this.request.studentId = this.studentId;
      this.request.currentSchool = this.currentSchool || 'Loading...';

      // Load schools only once or when currentSchool changes
      if (!this.schools.length) {
        this.api.getSchools().subscribe({
          next: (list) => {
            this.schools = list.filter(s => s !== this.currentSchool);
          },
          error: () => alert('Cannot load school list')
        });
      }
    }
  }

  submit(): void {
    if (!this.request.targetSchool || !this.request.reason?.trim()) {
      alert('Please select target school and enter reason');
      return;
    }

    if (this.request.targetSchool === this.request.currentSchool) {
      alert('Target school cannot be the same as current school.');
      return;
    }

    this.loading = true;

    this.api.applyTransfer(this.request).subscribe({
      next: () => {
        alert('Transfer request submitted successfully!');
        this.loading = false;
        this.close.emit(true);
      },
      error: () => {
        alert('Submission failed. Please try again.');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.close.emit(false);
  }
}