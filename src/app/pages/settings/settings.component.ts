import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/data';
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
  user: User;
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
    console.log('save button clicked');
    this.startLoading();
    this.cleanError();
    if (this.validator.validateFullname(this.user.fullname)) {
      this.apiService
        .updateUser(this.user)
        .toPromise()
        .then((data) => {
          this.stopLoading();
          console.log('data updated', data);
        })
        .catch((error) => {
          this.stopLoading();
          this.showError(error.error);
        });
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
