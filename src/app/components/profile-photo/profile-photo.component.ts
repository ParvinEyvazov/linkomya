import { EventEmitter, Input, Output, Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss'],
})
export class ProfilePhotoComponent implements OnInit {
  constructor() {}

  default_photo = '../../../assets/profile_photos/default_profile_photo.png';

  @Input() can_edit: boolean = false;
  @Input() url: string;
  @Input() in_user_card: boolean = false;
  @Input() user_id: string;

  @Output() event = new EventEmitter<boolean>();

  loading: boolean = false;

  ngOnInit(): void {
    this.url == undefined ? (this.url = this.default_photo) : undefined;
  }

  openEditPhotoDialog() {
    this.event.emit(true);
  }
}
