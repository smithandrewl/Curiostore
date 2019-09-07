import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map        } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  readonly BASE_URL = 'http://localhost/api';

  constructor(private http: HttpClient) { }

  /**
   * Logs in and sets the returned bearer token into memory.
   *
   * @param username The username to use.
   * @param password The password to use.
   */
  login(username: string, password: string): Observable<Object> {
    return this.http.post(
      `${this.BASE_URL}/login`,
      {
        email:    username,
        password: password
      }
    ).pipe(
      map((data: any) => {
        const token = data.token;
        localStorage.setItem('accesstoken', token);
        return data;
      })
    );
  }
}
