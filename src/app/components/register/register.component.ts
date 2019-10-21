import { Component, OnInit } from '@angular/core';
import { RegisterModel } from 'src/app/models/register.model';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = new RegisterModel();
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.userService.registerAccount(this.model).subscribe(data => {
        // tslint:disable-next-line:no-unused-expression
        this.router.navigate['/'];
      }
    );
  }
}
