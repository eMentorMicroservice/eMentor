import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AdminAccessGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {
  }

  canActivate() {
    if (AuthService.isLoggedIn() && AuthService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
