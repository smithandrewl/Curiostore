import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';

import { take, map } from 'rxjs/operators';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username;
  password;

  constructor(private security: SecurityService) { }

  ngOnInit() {
  }

  login() {
    this.security.login(this.username, this.password).subscribe(
      (data: any) => {
        console.log(JSON.stringify(data));
        localStorage.setItem('access_token', data.token);
      }
    );
  }

}
