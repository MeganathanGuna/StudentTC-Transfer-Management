import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Admin } from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private USER_KEY = 'currentUser';
  private ROLE_KEY = 'userRole';

  saveUser(user: Student | Admin, role: 'Student' | 'Admin') {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.ROLE_KEY, role);
  }

  getUser(): Student | Admin | null {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  getRole(): 'Student' | 'Admin' | null {
    return localStorage.getItem(this.ROLE_KEY) as any;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.ROLE_KEY);
  }
}