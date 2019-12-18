import { Component, OnInit } from '@angular/core';
import { RegisterModel } from 'src/app/models/register.model';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = new RegisterModel();
  backgroundImage = 'assets/images/coach-menntor.jpg';
  constructor(
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.spinner.show();
    this.userService.registerAccount(this.model).subscribe(data => {
      this.spinner.hide();
        // tslint:disable-next-line:no-unused-expression
      this.router.navigate(['/']);
      }
    );
  }
}
