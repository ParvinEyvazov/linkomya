import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user-services/user.service';
import { ApiService } from '../../services/api.service';

import { User } from '../../interfaces/data';
import { debounceTime } from 'rxjs/operators';

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

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) {}

  ngAfterViewInit(): void {
      console.log('a');
      this.input.update.pipe(debounceTime(100)).subscribe((value) => {
        console.log('val: ', value);
        console.log('username: ', this.username);
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

  //--non-new user
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

  //--new user
  checkUserName(username) {
    console.log(username);
  }

  //--api functions
  getUser(user_id) {
    this.apiService
      .getUser(user_id)
      .toPromise()
      .then((data) => {
        this.user = data[0];

        this.showPage(this.user);
      });
  }

  //helper common function
  showPage(user) {
    if (user.username) {
      this.new_user = false;
    } else {
      this.new_user = true;
    }
  }
}

export interface socialMedias {
  [key: string]: any;
}
