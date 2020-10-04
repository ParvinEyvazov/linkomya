import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      console.log('not authenticated');
      this.router.navigate(['/']);
      return false;
    } else {
      console.log('is authenticated!');
      return true;
    }
  }
}
