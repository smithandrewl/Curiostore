import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  readonly BASE_URL = 'http://localhost:9988';
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<Object> {
    return this.http.post(
      this.BASE_URL + '/login', {
      email: username,
      password: password
    }
  );
  }
}
