import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  student: any = null;
  requests: any[] = [];
  selectedSection: string = 'profile';

  // Controls the Apply Transfer modal
  showApplyModal: boolean = false;

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

    this.student = user;

    // Load fresh profile data
    this.api.getStudentProfile(user.id).subscribe({
      next: (data) => this.student = data,
      error: () => console.warn('Profile refresh failed')
    });

    this.loadRequests();
  }

  loadRequests(): void {
    if (this.student?.id) {
      this.api.getStudentNotifications(this.student.id).subscribe({
        next: (list) => this.requests = list || [],
        error: () => console.warn('Cannot load requests')
      });
    }
  }

  openApplyDialog(): void {
    if (!this.student?.id || !this.student?.school) {
      alert('Student profile not fully loaded yet.');
      return;
    }
    this.showApplyModal = true;
  }

  closeApplyModal(success: boolean = false): void {
    this.showApplyModal = false;
    if (success) {
      this.loadRequests(); // refresh list after successful apply
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  setSection(section: string): void {
    this.selectedSection = section;
    // Optional: scroll to top on section change
    window.scrollTo(0, 0);
  }

  getStatusClass(status: string): string {
    return `status-${(status || 'pending').toLowerCase()}`;
  }
}