import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewChildren,
} from '@angular/core';
import { UserService } from '../../services/user-services/user.service';
import { ApiService } from '../../services/api-services/api.service';

import { Connection, SocialMedia, User } from '../../interfaces/data';
import { debounceTime } from 'rxjs/operators';
import { ValidationService } from 'src/app/services/validation.service';
import { MessageService } from 'src/app/services/message.service';
import { SocialMediaService } from 'src/app/services/social-media-services/social-media.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements AfterViewInit {
  new_user: boolean;

  //-------NEW USER
  @ViewChild('input') input;
  username: string;
  username_error: string;
  username_check_error: boolean = false;
  username_check_loading: boolean = false;
  username_check_success: boolean = false;

  //--------NON-NEW USER
  edit_open: boolean = false;
  user: User;
  // -add new connection
  connections: Connection[];
  dialog_state_add_connection: boolean = false;

  //-edit connection link
  editing_connection_id: string;
  editing_connection: Connection;
  dialog_state_edit_connection: boolean = false;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private validator: ValidationService,
    private message: MessageService
  ) {}

  ngAfterViewInit(): void {
    this.input.update.pipe(debounceTime(1000)).subscribe((value) => {
      this.usernameOperation(false);
    });
  }

  ngOnInit(): void {
    //get user info
    this.getUser(this.userService.getUserId());
  }

  //-------------------------NEW USER------------------------
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
                  //works when username posted successfully
                  //get user info
                  this.getUser(this.userService.getUserId());
                  console.log('sended data : ', data);
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

  private showUsernameError(error_message) {
    this.username_error = error_message;
  }

  //------------------------NON NEW USER------------------------
  //--ADD NEW CONNECTION
  closeAddConnectionDialog(event) {
    if (event == true) {
      this.getConnections(this.userService.getUserId());
      this.closeAddNewConnectionDialog();
    } else {
      this.closeAddNewConnectionDialog();
    }
  }

  closeAddNewConnectionDialog() {
    this.dialog_state_add_connection = false;
  }

  //--EDIT CONNECTION LINK
  closeEditConnectionDialog(event) {
    if (event) {
      this.closeEditDialog();
      this.getConnections(this.userService.getUserId());
      //connectionlari cek
    } else {
      this.closeEditDialog();
    }
  }

  changeEditState() {
    this.edit_open = !this.edit_open;
  }

  closeEditDialog() {
    this.dialog_state_edit_connection = false;
  }

  openEditDialog(editing_connection_id: string) {
    this.editing_connection_id = editing_connection_id;
    this.editing_connection = this.getConnectionFromId(
      this.editing_connection_id
    );
  }

  //-------------------------API FUNCTIONS------------------------
  getUser(user_id) {
    this.apiService
      .getUser(user_id)
      .toPromise()
      .then((data) => {
        if (data) {
          this.user = data[0];
          this.showPage(this.user);
        }
      });
  }

  getConnections(user_id) {
    this.apiService
      .getConnections(user_id)
      .toPromise()
      .then((data) => {
        if (data) {
          this.connections = data;
        }
      });
  }

  //-------------------------HELPER FUNCTIONS------------------------
  showPage(user) {
    if (user.username) {
      this.isNewUser(false);
      this.getConnections(user._id);
    } else {
      this.isNewUser(true);
    }
  }

  getConnectionFromId(editin_connection_id) {
    for (let connection of this.connections) {
      if (connection._id == editin_connection_id) {
        return connection;
      }
    }
  }

  isNewUser(is_new_user) {
    this.new_user = is_new_user;
  }

  clearErrorMessages() {
    this.username_error = '';
  }
}
