import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialMedia } from 'src/app/interfaces/data';
import { ApiService } from '../api-services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  all_social_media: SocialMedia[];

  constructor(private apiService: ApiService) {
    this.getAllSocialMedias();
  }

  allSocialMedia() {
    return this.all_social_media;
  }

  getAllSocialMedias() {
    return this.apiService.getAllSocialMedia();
  }
}
