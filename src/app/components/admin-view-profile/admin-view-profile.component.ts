import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-view-profile',
  templateUrl: './admin-view-profile.component.html',
  styleUrls: ['./admin-view-profile.component.css']
})
export class AdminViewProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.route.params.subscribe(params => {
      let id = 0;
      if (!params['id']) {
        id = 0;
      } else {
        id = +params['id'];
      }
    });
  }
}
