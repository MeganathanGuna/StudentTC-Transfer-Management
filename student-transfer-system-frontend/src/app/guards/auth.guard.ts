import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const requiredRole = route.data['role'];
  const userRole = auth.getRole();

  if (requiredRole && userRole !== requiredRole) {
    router.navigate([userRole === 'Student' ? '/student' : '/admin']);
    return false;
  }

  return true;
};