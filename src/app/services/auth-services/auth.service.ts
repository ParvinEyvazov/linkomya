import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  AuthResult,
  JWT_AUTH,
  PasswordRecoveryChangePassword,
  PasswordRecoverySendCodeResult,
  PasswordRecoveryValidateCodeResult,
  RegisterSendInfoResult,
  RegisterValidateCodeResult,
  UpdatedPassword,
} from '../../interfaces/auth';
import { tap } from 'rxjs/operators';
import { EncryptionService } from '../encryption.service';
import { UpdatePassword } from 'src/app/interfaces/data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private encryptor: EncryptionService) {}

  get token(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    //TODO : checking token is expired or not
    return !!this.token;
  }

  //-----------LOGIN-----------
  login(email: string, password: string) {
    password = this.encryptor.encode(password);
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

  //-----------REGISTER-----------
  registerSendInfo(fullname: string, email: string, password: string) {
    password = this.encryptor.encode(password);
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
    password = this.encryptor.encode(password);
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

  //-----------PASSWORD RECOVERY-----------
  passwordRecoverySendCode(email: string) {
    return this.http
      .post<PasswordRecoverySendCodeResult>(
        `${environment.url}fn-execute/passwordRecoverySendCode`,
        { email },
        { withCredentials: true }
      )
      .pipe(
        tap((res) => {
          if (res) {
            localStorage.setItem('trace_id', res.trace_id);
            localStorage.setItem('email', email);
          }
        })
      );
  }

  passwordRecoveryValidateCode(auth_code: string) {
    let email = localStorage.getItem('email');
    let trace_id = localStorage.getItem('trace_id');
    return this.http
      .post<PasswordRecoveryValidateCodeResult>(
        `${environment.url}fn-execute/passwordRecoveryValidateCode`,
        {
          email,
          trace_id,
          auth_code,
        }
      )
      .pipe(
        tap((res) => {
          if (res) {
            localStorage.setItem('auth_code', auth_code);
          }
        })
      );
  }

  passwordRecoveryChangePassword(password: string) {
    password = this.encryptor.encode(password);
    let email = localStorage.getItem('email');
    let trace_id = localStorage.getItem('trace_id');
    let auth_code = localStorage.getItem('auth_code');
    return this.http
      .post<PasswordRecoveryChangePassword>(
        `${environment.url}fn-execute/passwordRecoveryChangePassword`,
        {
          email,
          trace_id,
          auth_code,
          password,
        }
      )
      .pipe(
        tap((res) => {
          this.cleanLocalStorage();
        })
      );
  }

  //-----------CHANGE PASSWORD-----------
  updatePassword(passwords: UpdatePassword) {
    passwords = {
      previous_password: this.encryptor.encode(passwords.previous_password),
      new_password: this.encryptor.encode(passwords.new_password),
      confirmed_password: this.encryptor.encode(passwords.confirmed_password),
    };

    const url = `${environment.url}fn-execute/updatePassword`;

    return this.http.post<UpdatedPassword>(url, { passwords: passwords });
  }

  //-----------LOGOUT-----------
  logout() {
    this.cleanLocalStorage();
    this.http
      .post(
        `${environment.url}fn-execute/logout`,
        {},
        { withCredentials: true }
      )
      .toPromise();
  }

  //helper functions

  private setSession(authResult: JWT_AUTH) {
    let date = new Date();
    date.setHours(date.getHours() + Number(authResult.expire / 60));
    localStorage.setItem('token', authResult.jwt_token);
    localStorage.setItem('expire', date.toISOString());
  }

  private cleanLocalStorage() {
    localStorage.clear();
  }
}
