import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  array: String[];
  edit_open: boolean = false;
  socialMedias: socialMedias[];
  testString:string="a";

  constructor() { }

  ngOnInit(): void {
    this.array = ["10", "2", "3", "4", "5", "6"];

    this.socialMedias = [
      {
        name: "Instagram",
        value: 0,
        img: "../../../../assets/social_media_icons/instagram.svg"
      },
      {
        name: "Twitter",
        value: 1,
        img: "../../../../assets/social_media_icons/twitter.svg"
      },
      {
        name: "Linkedin",
        value: 2,
        img: "../../../../assets/social_media_icons/linkedin.svg"
      },
      {
        name: "Facebook",
        value: 3,
        img: "../../../../assets/social_media_icons/facebook.svg"
      },
      {
        name: "Github",
        value: 4,
        img: "../../../../assets/social_media_icons/github.svg"
      },
      {
        name: "Whatsapp",
        value: 5,
        img: "../../../../assets/social_media_icons/whatsapp.svg"
      },
      {
        name: "Telegram",
        value: 6,
        img: "../../../../assets/social_media_icons/telegram.svg"
      },
      {
        name: "Discord",
        value: 7,
        img: "../../../../assets/social_media_icons/discord.svg"
      },
      {
        name: "Medium",
        value: 8,
        img: "../../../../assets/social_media_icons/medium.svg"
      },
      {
        name: "Reddit",
        value: 9,
        img: "../../../../assets/social_media_icons/reddit.svg"
      },
      {
        name: "Tiktok",
        value: 10,
        img: "../../../../assets/social_media_icons/tiktok.svg"
      },
      {
        name: "Wechat",
        value: 11,
        img: "../../../../assets/social_media_icons/wechat.svg"
      },
      {
        name: "Youtube",
        value: 12,
        img: "../../../../assets/social_media_icons/youtube.svg"
      },

    ];
  }

  changeEditState() {
    this.edit_open = !this.edit_open;
  }

  addNewSocialMedia() {
    console.log("ADDED NEW ONE");
  }

}

export interface socialMedias {
  [key: string]: any;
}