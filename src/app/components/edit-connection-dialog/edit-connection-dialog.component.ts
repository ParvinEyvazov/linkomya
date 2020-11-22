import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Connection } from 'src/app/interfaces/data';
import { ApiService } from 'src/app/services/api-services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-edit-connection-dialog',
  templateUrl: './edit-connection-dialog.component.html',
  styleUrls: ['./edit-connection-dialog.component.scss'],
})
export class EditConnectionDialogComponent implements OnInit {
  @Input() connection: Connection;
  @Output() event = new EventEmitter<boolean>();
  error: string;
  loading: boolean = false;
  link: string;

  editing_connection: Connection;

  constructor(
    private apiService: ApiService,
    private validator: ValidationService,
    private message: MessageService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

  save() {
    this.startLoading();
    this.cleanError();
    if (this.validator.validateLink(this.link)) {
      this.apiService
        .editConnection(this.connection._id, this.link)
        .toPromise()
        .then((data) => {
          this.cleanDialog();
          this.stopLoading();
          this.event.emit(true);
        })
        .catch((error) => {
          this.stopLoading();
          this.showError(error.error.message);
        });
    } else {
      this.showError(this.message.ErrorMessages.wrong_link_type);
      this.stopLoading();
    }
  }

  cancel() {
    this.cleanDialog();
    this.event.emit(false);
  }

  delete() {
    this.startLoading();

    setTimeout(() => {
      this.stopLoading();
      this.event.emit(true);
    }, 2000);
  }

  //helper functions
  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  showError(error_message) {
    this.error = error_message;
  }

  cleanError() {
    this.error = '';
  }

  cleanDialog() {
    this.link = '';
    this.error = '';
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
