import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/common/local.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  backgroundImage = 'assets/images/coach-menntor.jpg';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    LocalService.logout();
    this.authService.logOut();
  }

}
