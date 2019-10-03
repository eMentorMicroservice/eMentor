import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class LoginAccessGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {
  }

  canActivate() {
    if (AuthService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
