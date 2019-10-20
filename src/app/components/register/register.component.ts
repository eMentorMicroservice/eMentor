import { Component, OnInit } from '@angular/core';
import { RegisterModel } from 'src/app/models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = new RegisterModel();
  constructor() { }

  ngOnInit() {
  }

}
