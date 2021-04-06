import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces/data';
import { ApiService } from 'src/app/services/api-services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
})
export class GeneralSettingsComponent implements OnInit {
  @Input() user: User;
  loading: boolean = false;
  error: string;

  @Output() event = new EventEmitter<boolean>();

  constructor(
    private validator: ValidationService,
    private messageService: MessageService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {}

  save() {
    this.startLoading();
    this.cleanError();

    if (this.validator.validateFullname(this.user.fullname)) {
      this.apiService
        .updateUser(this.user)
        .toPromise()
        .then((data) => {
          this.event.emit(true);
        })
        .catch((error) => {
          this.stopLoading();
          this.showError(error.error.message);
        });
    } else {
      this.stopLoading();
      this.showError(this.messageService.ErrorMessages.fullname_validation);
    }
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  showError(error) {
    this.error = error;
    setTimeout(() => {
      this.cleanError();
    }, 3000);
  }

  cleanError() {
    this.error = '';
  }
}
