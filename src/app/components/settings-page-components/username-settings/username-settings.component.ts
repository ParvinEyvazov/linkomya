import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api-services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'username-settings',
  templateUrl: './username-settings.component.html',
  styleUrls: ['./username-settings.component.scss'],
})
export class UsernameSettingsComponent implements OnInit {
  @ViewChild('input') input;
  username: string;
  username_error: string;
  username_check_error: boolean = false;
  username_check_loading: boolean = false;
  username_check_success: boolean = false;

  @Output() event = new EventEmitter<boolean>();

  constructor(
    private apiService: ApiService,
    private validator: ValidationService,
    private message: MessageService
  ) {}

  ngAfterViewInit(): void {
    this.input.update.pipe(debounceTime(1000)).subscribe((value) => {
      this.usernameOperation(false);
    });
  }

  ngOnInit(): void {}

  assignUsername() {
    this.usernameOperation(true);
  }

  private usernameOperation(post_username) {
    this.clearErrorMessages();
    this.usernameState('clear');

    //check username validation
    if (this.validator.validateUsername(this.username)) {
      this.usernameState('loading');

      this.apiService
        .checkUsername(this.username)
        .toPromise()
        .then((data) => {
          if (data == true) {
            this.usernameState('success');
            //post username
            if (post_username) {
              this.apiService
                .postUsername(this.username)
                .toPromise()
                .then((data) => {
                  this.event.emit(true);
                })
                .catch((error) => {
                  this.showUsernameError(error.error.message);
                  this.usernameState('error');
                });
            }
          } else {
            this.showUsernameError(this.message.ErrorMessages.used_username);
            this.usernameState('error');
          }
        })
        .catch((error) => {
          this.showUsernameError(error.error.message);
          this.usernameState('error');
        });
    } else {
      if (this.username.length > 0) {
        this.showUsernameError(this.message.ErrorMessages.username_validation);
        this.usernameState('error');
      }
    }
  }

  private usernameState(state) {
    switch (state) {
      case 'error':
        this.username_check_error = true;
        this.username_check_loading = false;
        this.username_check_success = false;
        break;
      case 'loading':
        this.username_check_error = false;
        this.username_check_loading = true;
        this.username_check_success = false;
        break;
      case 'success':
        this.username_check_error = false;
        this.username_check_loading = false;
        this.username_check_success = true;
        break;
      case 'clear':
        this.username_check_error = false;
        this.username_check_loading = false;
        this.username_check_success = false;
        break;
      default:
        break;
    }
  }

  clearErrorMessages() {
    this.username_error = '';
  }

  private showUsernameError(error_message) {
    this.username_error = error_message;
  }
}
