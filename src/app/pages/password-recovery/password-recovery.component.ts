import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  change_password: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  //first step
  sendCode() {
    this.cleanMessages();
    this.changeProcessingState(true);

    this.authService
      .passwordRecoverySendCode(this.password_recovery_email)
      .toPromise()
      .then((data) => {
        //go to second step
        this.changeProcessingState(false);
        this.cleanMessages();
        this.showSuccessMessage(data.message);
        this.changeStep(2);
      })
      .catch((error_data) => {
        this.changeProcessingState(false);
        this.showErrorMessage(error_data.error.message);
      });
  }

  //second step
  verifyCode() {
    this.cleanMessages();
    this.changeProcessingState(true);

    this.authService
      .passwordRecoveryValidateCode(this.password_recovery_code)
      .toPromise()
      .then((data) => {
        //go to third step
        this.changeProcessingState(false);
        this.cleanMessages();
        this.showSuccessMessage(data.message);
        this.changeStep(3);
      })
      .catch((error_data) => {
        this.changeProcessingState(false);
        this.showErrorMessage(error_data.error.message);
      });
  }

  changeProcessingState(state: boolean) {
    this.processing = state;
  }

  cleanMessages() {
    this.error_message = '';
    this.success_message = '';
  }

  showSuccessMessage(message: string) {
    this.success_message = message;
  }

  showErrorMessage(message: string) {
    this.error_message = message;
  }

  changeStep(step: number) {
    switch (step) {
      case 1:
        this.send_code_step = true;
        this.validate_code_step = false;
        this.change_password = false;
        break;
      case 2:
        this.send_code_step = false;
        this.validate_code_step = true;
        this.change_password = false;
        break;
      case 3:
        this.send_code_step = false;
        this.validate_code_step = false;
        this.change_password = true;
        break;
      default:
        break;
    }
  }
}
