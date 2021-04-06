import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UpdatePassword } from 'src/app/interfaces/data';
import { AuthService } from 'src/app/services/auth-services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'password-settings',
  templateUrl: './password-settings.component.html',
  styleUrls: ['./password-settings.component.scss'],
})
export class PasswordSettingsComponent implements OnInit {
  passwords: UpdatePassword = {
    previous_password: '',
    new_password: '',
    confirmed_password: '',
  };
  error: string = '';
  loading: boolean = false;

  @Output() event = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private validator: ValidationService,
    private message: MessageService
  ) {}

  ngOnInit(): void {}

  save() {
    this.cleanError();
    this.startLoading();

    if (this.validator.validatePassword(this.passwords.previous_password)) {
      if (this.validator.validatePassword(this.passwords.new_password)) {
        if (this.passwords.new_password === this.passwords.confirmed_password) {
          if (this.passwords.new_password != this.passwords.previous_password) {
            // shits happen
            this.authService
              .updatePassword(this.passwords)
              .toPromise()
              .then((data) => {
                this.stopLoading();
                this.event.emit(true);
              })
              .catch((error) => {
                this.stopLoading();
                this.showError(error.error.message);
              });
          } else {
            this.stopLoading();
            this.showError(
              this.message.ErrorMessages.previous_and_new_password_matched
            );
          }
        } else {
          this.stopLoading();
          this.showError(this.message.ErrorMessages.password_not_same);
        }
      } else {
        this.stopLoading();
        this.showError(this.message.ErrorMessages.password_validation);
      }
    } else {
      this.stopLoading();
      this.showError(this.message.ErrorMessages.previous_password_validation);
    }
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  showError(error: string) {
    this.error = error;
  }

  cleanError() {
    this.error = '';
  }
}
