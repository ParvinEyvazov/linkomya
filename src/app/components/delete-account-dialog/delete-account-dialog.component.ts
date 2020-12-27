import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api-services/api.service';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.scss'],
})
export class DeleteAccountDialogComponent implements OnInit {
  loading: boolean = false;
  error: string = '';
  @Input() user_id: string;
  @Output() event = new EventEmitter<boolean>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  delete_account() {
    this.cleanError();
    this.startLoading();

    this.apiService
      .deleteAccount(this.user_id)
      .toPromise()
      .then((data) => {
        location.reload();
      })
      .catch((error) => {
        this.stopLoading();
        console.log(error);
        this.showError(error.error.message);
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

  cancel() {
    this.cleanError();
    this.event.emit(false);
  }
}
