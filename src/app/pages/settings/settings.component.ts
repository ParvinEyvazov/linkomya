import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/data';
import { ApiService } from 'src/app/services/api-services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { PageSpinnerService } from 'src/app/services/spinner-services/page-spinner/page-spinner.service';
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

  dialog_state_delele_account: boolean = false;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private validator: ValidationService,
    private messageService: MessageService,
    private pageSpinnerService: PageSpinnerService
  ) {}

  ngOnInit(): void {
    this.getUser(this.userService.getUserId());
  }

  save() {
    this.startLoading();
    this.cleanError();
    if (this.validator.validateFullname(this.user.fullname)) {
      this.apiService
        .updateUser(this.user)
        .toPromise()
        .then((data) => {
          this.stopLoading();
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

  closeDeleteDialog(event) {
    if (event == false) {
      this.closeDialog();
    }
  }

  closeDialog() {
    this.dialog_state_delele_account = false;
  }

  getUser(user_id) {
    this.pageSpinnerService.start();
    this.apiService
      .getUser(user_id)
      .toPromise()
      .then((data) => {
        if (data) {
          this.user = data[0];
        }
        this.pageSpinnerService.stop();
      })
      .catch((error) => {
        this.pageSpinnerService.reset();
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
