import { EventEmitter, Input, Output, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-services/api.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss'],
})
export class ProfilePhotoComponent implements OnInit {
  constructor(
    private storageService: StorageService,
    private apiService: ApiService
  ) {}

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

  // onFileChanged(event) {
  //   let file;
  //   const files = event.target.files;
  //   if (files.length > 0 && files && this.can_edit) {
  //     file = files[0];
  //     this.startLoading();
  //     this.storageService
  //       .giveFileAndGetUrl(file)
  //       .then((url) => {
  //         this.uploadPhoto(url);
  //       })
  //       .catch((error) => {
  //         this.stopLoading();
  //         this.event.emit({ error: error });
  //       });
  //   }
  // }

  // uploadPhoto(url) {
  //   if (this.can_edit) {
  //     this.apiService
  //       .uploadPhoto(url, true)
  //       .toPromise()
  //       .then((data) => {
  //         this.stopLoading();
  //         this.event.emit({ data: data });
  //       })
  //       .catch((error) => {
  //         this.stopLoading();
  //         this.event.emit({ error: error.error.message });
  //       });
  //   }
  // }

  // startLoading() {
  //   this.loading = true;
  // }

  // stopLoading() {
  //   this.loading = false;
  // }
}
