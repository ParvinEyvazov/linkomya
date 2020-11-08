import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewChildren,
} from '@angular/core';
import { UserService } from '../../services/user-services/user.service';
import { ApiService } from '../../services/api.service';

import { User } from '../../interfaces/data';
import { debounceTime } from 'rxjs/operators';
import { ValidationService } from 'src/app/services/validation.service';
import { MessageService } from 'src/app/services/message.service';

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
  socialMedias: socialMedias[];
  socialMedia: string = 'a';
  user: User;
  username: string;
  username_error: string;

  //create user name states
  username_check_error: boolean = false;
  username_check_loading: boolean = false;
  username_check_success: boolean = false;

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

    this.array = ['10', '2', '3', '4', '5', '6'];

    this.socialMedias = [
      {
        name: 'Instagram',
        value: 0,
        img: '../../../../assets/social_media_icons/instagram.svg',
      },
      {
        name: 'Twitter',
        value: 1,
        img: '../../../../assets/social_media_icons/twitter.svg',
      },
      {
        name: 'Linkedin',
        value: 2,
        img: '../../../../assets/social_media_icons/linkedin.svg',
      },
      {
        name: 'Facebook',
        value: 3,
        img: '../../../../assets/social_media_icons/facebook.svg',
      },
      {
        name: 'Github',
        value: 4,
        img: '../../../../assets/social_media_icons/github.svg',
      },
      {
        name: 'Whatsapp',
        value: 5,
        img: '../../../../assets/social_media_icons/whatsapp.svg',
      },
      {
        name: 'Telegram',
        value: 6,
        img: '../../../../assets/social_media_icons/telegram.svg',
      },
      {
        name: 'Discord',
        value: 7,
        img: '../../../../assets/social_media_icons/discord.svg',
      },
      {
        name: 'Medium',
        value: 8,
        img: '../../../../assets/social_media_icons/medium.svg',
      },
      {
        name: 'Reddit',
        value: 9,
        img: '../../../../assets/social_media_icons/reddit.svg',
      },
      {
        name: 'Tiktok',
        value: 10,
        img: '../../../../assets/social_media_icons/tiktok.svg',
      },
      {
        name: 'Wechat',
        value: 11,
        img: '../../../../assets/social_media_icons/wechat.svg',
      },
      {
        name: 'Youtube',
        value: 12,
        img: '../../../../assets/social_media_icons/youtube.svg',
      },
    ];
  }

  //------------------------NON NEW USER------------------------
  changeEditState() {
    this.edit_open = !this.edit_open;
  }

  addNewSocialMedia() {
    console.log('ADDED NEW ONE');
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

  //-------------------------NEW USER------------------------
  private assignUsername() {
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

  //-------------------------API FUNCTIONS------------------------
  getUser(user_id) {
    this.apiService
      .getUser(user_id)
      .toPromise()
      .then((data) => {
        this.user = data[0];

        this.showPage(this.user);
      });
  }

  //-------------------------HELPER FUNCTIONS------------------------
  showPage(user) {
    if (user.username) {
      this.new_user = false;
    } else {
      this.new_user = true;
    }
  }

  clearErrorMessages() {
    this.username_error = '';
  }
}

export interface socialMedias {
  [key: string]: any;
}
