import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent implements OnInit {
  password_recovery_email: string;
  password_recovery_code: string;
  password_recovery_password1: string;
  password_recovery_password2: string;
  password_recovery_password: string;

  error_message: string;
  success_message: string;

  processing: boolean = false;

  //states
  send_code_step: boolean = true;
  validate_code_step: boolean = false;
  change_password_step: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private validator: ValidationService,
    private message: MessageService
  ) {}

  ngOnInit(): void {}

  //first step - send code
  sendCode() {
    this.cleanErrorMessage();
    this.startProgressIndicator();

    if (this.validator.validateEmail(this.password_recovery_email)) {
      this.authService
        .passwordRecoverySendCode(this.password_recovery_email)
        .toPromise()
        .then((data) => {
          //go to second step
          this.stopProgressIndicator();
          this.cleanMessages();
          this.showSuccessMessage(data.message);
          this.changeStep(2);
        })
        .catch((error_data) => {
          this.stopProgressIndicator();
          this.showErrorMessage(error_data.error.message);
        });
    } else {
      this.stopProgressIndicator();
      this.showErrorMessage(this.message.ErrorMessages.email_validation);
    }
  }

  //second step - validate code
  verifyCode() {
    this.cleanErrorMessage();
    this.startProgressIndicator();

    this.authService
      .passwordRecoveryValidateCode(this.password_recovery_code)
      .toPromise()
      .then((data) => {
        //go to third step
        this.stopProgressIndicator();
        this.cleanMessages();
        this.showSuccessMessage(data.message);
        this.changeStep(3);
      })
      .catch((error_data) => {
        this.stopProgressIndicator();
        this.showErrorMessage(error_data.error.message);
      });
  }

  //third step - change password
  changePassword() {
    this.cleanErrorMessage();
    this.startProgressIndicator();

    if (this.validator.validatePassword(this.password_recovery_password1)) {
      if (
        this.password_recovery_password1 == this.password_recovery_password2
      ) {
        this.password_recovery_password = this.password_recovery_password1;
        this.authService
          .passwordRecoveryChangePassword(this.password_recovery_password)
          .toPromise()
          .then((data) => {
            this.showSuccessMessage(data.message);
            this.startProgressIndicator();
            setTimeout(() => {
              this.router.navigate([`sign-in`]);
            }, 2000);
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
  }

  //helper functions
  startProgressIndicator() {
    this.processing = true;
  }

  stopProgressIndicator() {
    this.processing = false;
  }

  cleanErrorMessage() {
    this.error_message = '';
  }

  cleanMessages() {
    this.error_message = '';
    this.success_message = '';
  }

  showSuccessMessage(success_message: string) {
    this.success_message = success_message;
  }

  showErrorMessage(error_message: string) {
    this.error_message = error_message;
  }

  changeStep(step: number) {
    switch (step) {
      case 1:
        this.send_code_step = true;
        this.validate_code_step = false;
        this.change_password_step = false;
        break;
      case 2:
        this.send_code_step = false;
        this.validate_code_step = true;
        this.change_password_step = false;
        break;
      case 3:
        this.send_code_step = false;
        this.validate_code_step = false;
        this.change_password_step = true;
        break;
      default:
        break;
    }
  }
}
