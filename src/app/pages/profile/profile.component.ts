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
import { FormControl, FormGroup, ControlContainer } from '@angular/forms';

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
  all_social_media: SocialMedia[];
  connections: Connection[];
  selected_social_media_to_add: SocialMedia;
  dialog_state_add_connection: boolean = false;
  socialMedia: string = 'a';
  new_connection_link: string;
  add_new_connection_loading: boolean = false;
  add_new_connection_error_message: string = '';

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private validator: ValidationService,
    private message: MessageService,
    private socialMediaService: SocialMediaService
  ) {}

  ngAfterViewInit(): void {
    this.input.update.pipe(debounceTime(1000)).subscribe((value) => {
      this.usernameOperation(false);
    });
  }

  ngOnInit(): void {
    //get user info
    this.getUser(this.userService.getUserId());

    //get all social medias
    this.socialMediaService
      .getAllSocialMedias()
      .toPromise()
      .then((data) => {
        console.log(data);
        this.all_social_media = data;
        this.selected_social_media_to_add = this.all_social_media[
          this.all_social_media.length - 1
        ];
      });
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
  addNewConnection() {
    this.startAddNewConnectionProgressIndicator();
    console.log(this.selected_social_media_to_add);
    if (this.validator.validateLink(this.new_connection_link)) {
      let social_media_id = this.selected_social_media_to_add._id;
      this.apiService
        .addNewConnection(social_media_id, this.new_connection_link)
        .toPromise()
        .then((data) => {
          console.log(data);
          this.clearAddNewConnectionErrorMessage();
          this.closeAddNewConnectionDialog();
          this.stopAddNewConnectionProgressIndicator();
        })
        .catch((error) => {
          this.stopAddNewConnectionProgressIndicator();
          this.showAddNewConnectionError(error.error.message);
        });
    } else {
      this.showAddNewConnectionError(
        this.message.ErrorMessages.wrong_link_type
      );
      this.stopAddNewConnectionProgressIndicator();
    }
  }

  startAddNewConnectionProgressIndicator() {
    this.add_new_connection_loading = true;
  }

  stopAddNewConnectionProgressIndicator() {
    this.add_new_connection_loading = false;
  }

  closeAddNewConnectionDialog() {
    this.dialog_state_add_connection = false;
  }

  showAddNewConnectionError(error_message) {
    this.add_new_connection_error_message = error_message;
  }

  clearAddNewConnectionErrorMessage() {
    this.add_new_connection_error_message = '';
  }

  //--EDIT CONNECTION LINK
  changeEditState() {
    this.edit_open = !this.edit_open;
  }

  openEditModal(number: string) {
    this.socialMedia = number;
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

  isNewUser(is_new_user) {
    this.new_user = is_new_user;
  }

  clearErrorMessages() {
    this.username_error = '';
  }
}
