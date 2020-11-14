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
  @ViewChild('input') input;

  array: String[];
  edit_open: boolean = false;
  new_user: boolean;

  all_social_media: SocialMedia[];
  connections: Connection[];
  socialMedia: string = 'a';
  new_connection_link: string;

  selectedSocialMediaToAdd;

  dialog_state_add_connection: boolean = false;

  user: User;
  username: string;
  username_error: string;

  // create user name states
  username_check_error: boolean = false;
  username_check_loading: boolean = false;
  username_check_success: boolean = false;

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

    this.array = ['10', '2', '3', '4', '5', '6'];

    this.socialMediaService
      .getAllSocialMedias()
      .toPromise()
      .then((data) => {
        console.log(data);
        this.all_social_media = data;
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
  changeEditState() {
    this.edit_open = !this.edit_open;
  }

  addNewConnection(event) {
    this.dialog_state_add_connection = false;
    console.log(event);
    if (this.validator.validateLink(this.new_connection_link)) {
      let social_media_id = this.selectedSocialMediaToAdd._id;

      // this.apiService
      //   .addNewConnection(social_media_id, this.new_connection_link)
      //   .toPromise()
      //   .then((data) => {
      //     console.log(data);
      //   });
    }
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
