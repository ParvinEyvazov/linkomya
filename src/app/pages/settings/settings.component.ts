import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user-services/user.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user;
  loading: boolean = false;
  error: string;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private validator: ValidationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUser(this.userService.getUserId());
  }

  save() {
    this.startLoading();
    this.cleanError();
    if (this.validator.validateFullname(this.user.fullname)) {
      setTimeout(() => {
        this.stopLoading();
      }, 2000);
      console.log('saving new data');
    } else {
      this.stopLoading();
      this.showError(this.messageService.ErrorMessages.fullname_validation);
    }
  }

  getUser(user_id) {
    this.apiService
      .getUser(user_id)
      .toPromise()
      .then((data) => {
        if (data) {
          this.user = data[0];
          console.log(this.user);
        }
      });
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  showError(error) {
    this.error = error;
  }

  cleanError() {
    this.error = '';
  }
}
