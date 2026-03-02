import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent {

  @Input() request: any;
  @Input() isAdminView: boolean = false;
  @Input() isCurrentSchoolAdmin: boolean = false;

  @Output() statusChanged = new EventEmitter<{id: number, status: string}>();
  @Output() remarksSubmitted = new EventEmitter<{id: number, remarks: string}>();

  selectedStatus: string = '';
  remarksText: string = '';

  changeStatus(): void {
    if (this.selectedStatus) {
      this.statusChanged.emit({
        id: this.request.id,
        status: this.selectedStatus
      });
      this.selectedStatus = ''; // reset after submit
    }
  }

  submitRemarks(): void {
    if (this.remarksText.trim()) {
      this.remarksSubmitted.emit({
        id: this.request.id,
        remarks: this.remarksText.trim()
      });
      this.remarksText = ''; // reset after submit
    }
  }

  getStatusClass(status: string): string {
    return `status-${status?.toLowerCase() || 'pending'}`;
  }
}