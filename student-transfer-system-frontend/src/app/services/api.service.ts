import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { Admin } from '../models/admin.model';
import { TransferRequest } from '../models/transfer.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Schools
  getSchools(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/schools`);
  }

  // Users
  registerStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/users/register/student`, student);
  }

  registerAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.baseUrl}/users/register/admin`, admin);
  }

  login(username: string, password: string, role: 'Student' | 'Admin'): Observable<any> {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('role', role);
    return this.http.post<any>(`${this.baseUrl}/users/login`, null, { params });
  }

  getStudentProfile(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/users/student/${id}`);
  }

  getAdminProfile(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/users/admin/${id}`);
  }

  // Transfers
  applyTransfer(request: TransferRequest): Observable<TransferRequest> {
    return this.http.post<TransferRequest>(`${this.baseUrl}/transfers/apply`, request);
  }

  getTargetNotifications(school: string): Observable<TransferRequest[]> {
    return this.http.get<TransferRequest[]>(`${this.baseUrl}/transfers/target/${encodeURIComponent(school)}`);
  }

  getCurrentNotifications(school: string): Observable<TransferRequest[]> {
    return this.http.get<TransferRequest[]>(`${this.baseUrl}/transfers/current/${encodeURIComponent(school)}`);
  }

  getStudentNotifications(studentId: number): Observable<TransferRequest[]> {
    return this.http.get<TransferRequest[]>(`${this.baseUrl}/transfers/student/${studentId}`);
  }

  updateStatus(id: number, status: string): Observable<TransferRequest> {
    return this.http.put<TransferRequest>(`${this.baseUrl}/transfers/status/${id}?status=${status}`, null);
  }

  addRemarks(id: number, remarks: string): Observable<TransferRequest> {
    return this.http.put<TransferRequest>(`${this.baseUrl}/transfers/remarks/${id}?remarks=${encodeURIComponent(remarks)}`, null);
  }
}