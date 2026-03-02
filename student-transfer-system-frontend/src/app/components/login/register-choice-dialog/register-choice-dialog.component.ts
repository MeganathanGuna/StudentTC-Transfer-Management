import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-choice-dialog',
  templateUrl: './register-choice-dialog.component.html',
  styleUrls: ['./register-choice-dialog.component.scss']
})
export class RegisterChoiceDialogComponent {

  constructor(
      private router: Router
    ) { }

  // For now we keep it simple – parent will handle logic
  select(type: 'student' | 'admin') {
    // Parent will receive this event
    // But since it's a separate component now, we use @Output
  }

  close() {
    this.router.navigate(['/login']);
  }
}