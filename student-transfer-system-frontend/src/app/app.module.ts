import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';          // ← MUST HAVE
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { TransferApplyDialogComponent } from './components/transfer-apply-dialog/transfer-apply-dialog.component';
import { NotificationCardComponent } from './components/notification-card/notification-card.component';
import { RegisterChoiceDialogComponent } from './components/login/register-choice-dialog/register-choice-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterStudentComponent,
    RegisterAdminComponent,
    StudentDashboardComponent,
    AdminDashboardComponent,
    TransferApplyDialogComponent,
    NotificationCardComponent,
    RegisterChoiceDialogComponent,
    // If you keep RegisterChoiceDialogComponent in login file → no need to declare it here
  ],
  imports: [
    BrowserModule,
  BrowserAnimationsModule,  // ← you can remove if no animations left
  FormsModule,
  HttpClientModule,
  AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }