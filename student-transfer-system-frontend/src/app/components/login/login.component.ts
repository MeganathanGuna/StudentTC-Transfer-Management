import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  role: 'Student' | 'Admin' = 'Student';

  showRegisterModal: boolean = false;
  showStudentRegister: boolean = false;
  showAdminRegister: boolean = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  login(): void {
    if (!this.username || !this.password || !this.role) {
      alert('Please fill username, password and select role');
      return;
    }

    this.api.login(this.username, this.password, this.role).subscribe({
      next: (user: any) => {
        this.auth.saveUser(user, this.role);
        if (this.role === 'Student') {
          this.router.navigate(['/student']);
        } else {
          this.router.navigate(['/admin']);
        }
      },
      error: () => {
        alert('Login failed. Please check your credentials.');
      }
    });
  }

  selectRegisterType(type: 'student' | 'admin'): void {
    this.showRegisterModal = false;

    if (type === 'student') {
      this.showStudentRegister = true;
    } else {
      this.showAdminRegister = true;
    }
  }

  onStudentRegisterClose(success: boolean): void {
    this.showStudentRegister = false;
    if (success) {
      alert('Student registration complete! You can now login.');
    }
  }

  onAdminRegisterClose(success: boolean): void {
    this.showAdminRegister = false;
    if (success) {
      alert('Admin registration complete! You can now login.');
    }
  }
}