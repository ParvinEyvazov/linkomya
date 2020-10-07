import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  AuthResult,
  JWT_AUTH,
  RegisterSendInfoResult,
  RegisterValidateCodeResult,
} from '../interfaces/auth';
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

  registerSendInfo(fullname: string, email: string, password: string) {
    return this.http
      .post<RegisterSendInfoResult>(
        `${environment.url}fn-execute/registerSendCode`,
        {
          email,
          fullname,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((res) => {
          if (res && res.trace_id) {
            localStorage.setItem('trace_id', res.trace_id);
          }
        })
      );
  }

  registerValidateCode(
    email: string,
    fullname: string,
    password: string,
    trace_id: string,
    auth_code: string
  ) {
    return this.http
      .post<RegisterValidateCodeResult>(
        `${environment.url}fn-execute/registerValidateCode`,
        {
          email,
          fullname,
          password,
          trace_id,
          auth_code,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((res) => {
          if (res) {
            localStorage.removeItem('trace_id');
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('fullname');
    localStorage.removeItem('trace_id');
    this.http
      .post(
        `${environment.url}fn-execute/logout`,
        {},
        { withCredentials: true }
      )
      .toPromise();
  }
}
