import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { ValidationService } from 'src/app/services/validation.service';

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
    private message: MessageService,
    private validator: ValidationService
  ) {}

  ngOnInit(): void {}

  registerSendInfo() {
    this.cleanMessages();
    this.startProgressIndicator();

    if (this.validator.validateFullname(this.register_fullname)) {
      if (this.validator.validateEmail(this.register_email)) {
        if (this.validator.validatePassword(this.register_password1)) {
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
                this.stopProgressIndicator();
                this.first_step = false;
                this.trace_id = data.trace_id;
                this.showSuccessMessage(data.message);
              })
              .catch((error_data) => {
                this.stopProgressIndicator();
                this.showErrorMessage(error_data.error.message);
              });
          } else {
            this.stopProgressIndicator();
            this.showErrorMessage(this.message.ErrorMessages.password_not_same);
          }
        } else {
          this.stopProgressIndicator();
          this.showErrorMessage(this.message.ErrorMessages.password_validation);
        }
      } else {
        this.stopProgressIndicator();
        this.showErrorMessage(this.message.ErrorMessages.email_validation);
      }
    } else {
      this.stopProgressIndicator();
      this.showErrorMessage(this.message.ErrorMessages.fullname_validation);
    }
  }

  registerValidateCode() {
    this.cleanMessages();
    this.startProgressIndicator();

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
        this.showSuccessMessage(data.message);
        this.startProgressIndicator();
        setTimeout(() => {
          this.router.navigate(['sign-in']);
        }, 2000);
      })
      .catch((error_data) => {
        this.stopProgressIndicator();
        this.showErrorMessage(error_data.error.message);
      });
  }

  //helper functions
  startProgressIndicator() {
    this.register_progress = true;
  }

  stopProgressIndicator() {
    this.register_progress = false;
  }

  showSuccessMessage(success_message) {
    this.success_message = success_message;
  }

  showErrorMessage(error_message) {
    this.error_message = error_message;
  }

  cleanMessages() {
    this.error_message = '';
  }
}
