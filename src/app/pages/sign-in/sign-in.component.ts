import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-services/auth.service';
import { ValidationService } from '../../services/validation.service';
import { MessageService } from '../../services/message.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  login_email: string;
  login_password: string;
  login_progress: boolean = false;
  error_message: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private validator: ValidationService,
    private message: MessageService
  ) {}

  ngOnInit(): void {}

  //login function - `works when form is valid`
  login() {
    this.startProgressIndicator();
    this.cleanMessages();
    if (this.validator.validateEmail(this.login_email)) {
      if (this.validator.validatePassword(this.login_password)) {
        this.authService
          .login(this.login_email, this.login_password)
          .toPromise()
          .then((data) => {
            this.stopProgressIndicator();
            this.router.navigate(['/']);
          })
          .catch((error_data) => {
            this.stopProgressIndicator();
            this.showError(error_data.error.message);
          });
      } else {
        this.stopProgressIndicator();
        this.showError(this.message.ErrorMessages.password_validation);
      }
    } else {
      this.stopProgressIndicator();
      this.showError(this.message.ErrorMessages.email_validation);
    }
  }

  //helper functions
  startProgressIndicator() {
    this.login_progress = true;
  }

  stopProgressIndicator() {
    this.login_progress = false;
  }

  showError(error_message) {
    this.error_message = error_message;
  }

  cleanMessages() {
    this.error_message = '';
  }
}
