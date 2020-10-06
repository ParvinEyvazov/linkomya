import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthResult, JWT_AUTH } from '../interfaces/auth';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    //TODO : checking token is expired or not
    return !!this.token;
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResult>(
        `${environment.url}fn-execute/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((res) => {
          if (res && res.jwt_auth && res.jwt_auth.jwt_token) {
            localStorage.setItem('user_id', res.user_id);
            localStorage.setItem('fullname', res.fullname);
            localStorage.setItem('username', res.username);
            this.setSession({
              jwt_token: res.jwt_auth.jwt_token,
              expire: res.jwt_auth.expire,
            });
          } else {
            return;
          }
        })
      );
  }

  private setSession(authResult: JWT_AUTH) {
    let date = new Date();
    date.setHours(date.getHours() + Number(authResult.expire / 60));
    localStorage.setItem('token', authResult.jwt_token);
    localStorage.setItem('expire', date.toISOString());
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('fullname');
    this.http
      .post(
        `${environment.url}fn-execute/logout`,
        {},
        { withCredentials: true }
      )
      .toPromise();
  }
}
