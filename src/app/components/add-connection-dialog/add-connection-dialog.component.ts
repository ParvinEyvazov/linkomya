import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SocialMedia } from 'src/app/interfaces/data';
import { ApiService } from 'src/app/services/api-services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { SocialMediaService } from 'src/app/services/social-media-services/social-media.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add-connection-dialog',
  templateUrl: './add-connection-dialog.component.html',
  styleUrls: ['./add-connection-dialog.component.scss'],
})
export class AddConnectionDialogComponent implements OnInit {
  state: boolean = false;
  link: string;
  error: string;
  loading: boolean = false;

  selected_social_media: SocialMedia;
  social_media;
  social_medias: SocialMedia[];

  @Output() event = new EventEmitter<boolean>();

  constructor(
    private validator: ValidationService,
    private apiService: ApiService,
    private message: MessageService,
    private socialMediaService: SocialMediaService
  ) {}

  ngOnInit(): void {
    this.getSocialMedias();
  }

  add() {
    this.startLoading();
    this.cleanError();
    if (this.validator.validateLink(this.link)) {
      this.link = this.validator.updateLink(this.link);
      let social_media_id = this.selected_social_media._id;
      this.apiService
        .addNewConnection(social_media_id, this.link)
        .toPromise()
        .then((data) => {
          this.cleanDialog();
          this.stopLoading();
          this.event.emit(true);
        })
        .catch((error) => {
          this.stopLoading();
          this.showError(error.error.message);
        });
    } else {
      this.showError(this.message.ErrorMessages.wrong_link_type);
      this.stopLoading();
    }
  }

  cancel() {
    this.cleanDialog();
    this.event.emit(false);
  }

  getSocialMedias() {
    this.socialMediaService
      .getAllSocialMedias()
      .toPromise()
      .then((data) => {
        this.social_medias = data;
        this.selected_social_media = this.social_medias[
          this.social_medias.length - 1
        ];
      });
  }

  //helper functions
  startLoading() {
    this.loading = true;
  }
  stopLoading() {
    this.loading = false;
  }

  showError(error_message) {
    this.error = error_message;
  }

  cleanError() {
    this.error = '';
  }

  cleanDialog() {
    this.error = '';
    this.link = '';
  }
}
