import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../shared/services/security.service';

import { take, map } from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username;
  password;

  constructor(private security: SecurityService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.security.login(this.username, this.password).subscribe(
      (data: any) => {
        console.log(JSON.stringify(data));
        localStorage.setItem('accesstoken', data.token);
        this.router.navigateByUrl('portal');
      }
    );
  }

}
