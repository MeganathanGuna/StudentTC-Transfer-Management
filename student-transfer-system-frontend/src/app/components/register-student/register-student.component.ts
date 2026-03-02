import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {

  @Output() closeModal = new EventEmitter<boolean>();  // true = success, false = cancel

  student: any = {
    name: '',
    regId: '',
    dob: '',
    phone: '',
    school: '',
    password: ''
  };

  schools: string[] = [];
  loading: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getSchools().subscribe({
      next: (list) => this.schools = list,
      error: () => alert('Cannot load school list. Please check your connection.')
    });
  }

  register(): void {
    if (!this.student.name?.trim() || 
        !this.student.regId?.trim() || 
        !this.student.dob?.trim() || 
        !this.student.phone?.trim() || 
        !this.student.school || 
        !this.student.password?.trim()) {
      alert('Please fill all required fields correctly.');
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(this.student.dob)) {
      alert('Please enter Date of Birth in YYYY-MM-DD format.');
      return;
    }

    this.loading = true;

    this.api.registerStudent(this.student).subscribe({
      next: () => {
        alert('Student registered successfully!\nYou can now login with your Register Number and Password.');
        this.loading = false;
        this.closeModal.emit(true);   // Success → parent can close modal & refresh
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed.\nPossible reasons: duplicate Register Number or server error.');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.closeModal.emit(false);   // Cancel → parent just hides modal
  }
}