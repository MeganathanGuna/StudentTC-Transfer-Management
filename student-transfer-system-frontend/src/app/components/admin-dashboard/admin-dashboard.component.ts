import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  admin: any = null;
  targetRequests: any[] = [];
  currentRequests: any[] = [];
  selectedSection: string = 'notifications';

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.auth.getUser();
    if (!user || !user.id) {
      this.router.navigate(['/login']);
      return;
    }

    this.admin = user;

    this.api.getAdminProfile(user.id).subscribe({
      next: (data) => this.admin = data,
      error: () => console.log('Cannot refresh admin profile')
    });

    this.loadNotifications();
  }

  loadNotifications(): void {
    if (this.admin?.school) {
      this.api.getTargetNotifications(this.admin.school).subscribe({
        next: (list) => {
          this.targetRequests = list.map(req => ({ ...req, selectedStatus: '' }));
        },
        error: () => console.log('Cannot load target notifications')
      });

      this.api.getCurrentNotifications(this.admin.school).subscribe({
        next: (list) => {
          this.currentRequests = list.map(req => ({ ...req, remarksInput: '' }));
        },
        error: () => console.log('Cannot load current school notifications')
      });
    }
  }

  updateStatus(event: {id: number, status: string}): void {
  if (!event.status) return;

  this.api.updateStatus(event.id, event.status).subscribe({
    next: () => {
      alert('Status updated successfully');
      this.loadNotifications();
    },
    error: () => alert('Failed to update status')
  });
}

  submitRemarks(event: {id: number, remarks: string}): void {
  if (!event.remarks?.trim()) return;

  this.api.addRemarks(event.id, event.remarks).subscribe({
    next: () => {
      alert('Remarks sent successfully');
      this.loadNotifications();
    },
    error: () => alert('Failed to send remarks')
  });
}

  getStatusClass(status: string): string {
    return `status-${(status || 'pending').toLowerCase()}`;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  setSection(section: string): void {
    this.selectedSection = section;
    console.log('Section changed to:', section); // ← debug
  }
}