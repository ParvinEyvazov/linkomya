import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-services/api.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-background-photo',
  templateUrl: './background-photo.component.html',
  styleUrls: ['./background-photo.component.scss'],
})
export class BackgroundPhotoComponent implements OnInit {
  @Input() can_edit: boolean = false;
  @Input() url: string =
    '../../../assets/profile_photos/default_profile_photo.png';

  @Output() event = new EventEmitter<object>();

  loading: boolean = false;

  constructor(
    private storageService: StorageService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {}

  onFileChanged(event) {
    let file;
    const files = event.target.files;
    if (files.length > 0 && files && this.can_edit) {
      file = files[0];
      this.startLoading();
      this.storageService
        .giveFileAndGetUrl(file)
        .then((url) => {
          this.uploadPhoto(url);
        })
        .catch((error) => {
          this.stopLoading();
          this.event.emit({ error: error });
        });
    }
  }


  uploadPhoto(url) {
    if (this.can_edit) {
      this.apiService
        .uploadPhoto(url, false)
        .toPromise()
        .then((data) => {
          this.stopLoading();
          this.event.emit({ data: data });
        })
        .catch((error) => {
          this.stopLoading();
          this.event.emit({ error: error.error.message });
        });
    }
  }




  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }
}
