import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {

  @Output() closeModal = new EventEmitter<boolean>();
  admin: any = {
    name: '',
    empId: '',
    role: '',
    password: '',
    school: ''
  };

  schools: string[] = [];
  loading: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getSchools().subscribe({
      next: (list) => this.schools = list,
      error: () => alert('Cannot load school list. Please try again later.')
    });
  }

  register(): void {
    if (!this.admin.name?.trim() || 
        !this.admin.empId?.trim() || 
        !this.admin.role?.trim() || 
        !this.admin.password?.trim() || 
        !this.admin.school) {
      alert('Please fill all required fields');
      return;
    }

    this.loading = true;

    this.api.registerAdmin(this.admin).subscribe({
      next: () => {
        alert('Admin / Staff account registered successfully!\nYou can now login.');
        this.loading = false;
        this.closeModal.emit(true);
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed.\nPossible reasons: duplicate Employee ID or server error.');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.closeModal.emit(false);
  }
}