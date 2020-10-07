import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  register_fullname: string;
  register_email: string;
  register_password: string;
  register_password1: string;
  register_password2: string;

  trace_id: string;
  auth_code: string;

  register_progress: boolean = false;
  first_step: boolean = true;

  error_message: string;
  success_message: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  registerSendInfo() {
    this.cleanMessages();
    this.register_progress = true;

    if (this.register_password1 == this.register_password2) {
      this.register_password = this.register_password1;
      this.authService
        .registerSendInfo(
          this.register_fullname,
          this.register_email,
          this.register_password
        )
        .toPromise()
        .then((data) => {
          this.register_progress = false;
          this.first_step = false;
          this.trace_id = data.trace_id;
          this.success_message = data.message;
        })
        .catch((error_data) => {
          this.register_progress = false;
          this.error_message = error_data.error.message;
        });
    } else {
      this.register_progress = false;
      this.error_message = 'Passwords are not same.';
    }
  }

  registerValidateCode() {
    this.cleanMessages();
    this.register_progress = true;

    this.authService
      .registerValidateCode(
        this.register_email,
        this.register_fullname,
        this.register_password,
        localStorage.getItem('trace_id'),
        this.auth_code
      )
      .toPromise()
      .then((data) => {
        this.register_progress = false;
        this.success_message = data.message;
        setTimeout(() => {
          this.router.navigate(['sign-in']);
        }, 2000);
      })
      .catch((error_data) => {
        this.register_progress = false;
        this.error_message = error_data.error.message;
      });
  }

  cleanMessages() {
    this.error_message = '';
  }
}
