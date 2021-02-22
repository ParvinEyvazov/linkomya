import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-services/api.service';
import { UserService } from 'src/app/services/user-services/user.service';

@Component({
  selector: 'app-favoriting',
  templateUrl: './favoriting.component.html',
  styleUrls: ['./favoriting.component.scss'],
})
export class FavoritingComponent implements OnInit {
  @Input() favorite_user_id: string;

  is_favorite: boolean = false;
  loading: boolean = true;
  user_id: string;
  is_own_profile: boolean = true;
  is_logged_in: boolean = false;

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    if (this.userService.getUserId()) {
      this.is_logged_in = true;
      this.user_id = this.userService.getUserId();
      this.isOwnProfile(this.favorite_user_id);
    } else {
      this.is_logged_in = false;
    }
  }

  isOwnProfile(user_id) {
    if (user_id == this.userService.getUserId()) {
      this.is_own_profile = true;
      this.stopLoading();
    } else {
      this.is_own_profile = false;
      this.isFavorite(this.user_id, this.favorite_user_id);
    }
  }

  isFavorite(user_id, favorite_user_id) {
    this.apiService
      .checkFavoriteRelation(user_id, favorite_user_id)
      .toPromise()
      .then((data) => {
        if (data == true) {
          this.is_favorite = true;
        } else {
          this.is_favorite = false;
        }
        this.stopLoading();
      })
      .catch((error) => {
        this.stopLoading();
      });
  }

  changeFavoriteRelation() {
    if (this.is_favorite == true) {
      this.startLoading();
      this.apiService
        .deleteFromFavorites(this.user_id, this.favorite_user_id)
        .toPromise()
        .then((data) => {
          this.stopLoading();
          this.is_favorite = !this.is_favorite;
        })
        .catch((error) => {
          this.stopLoading();
        });
    } else if (this.is_favorite == false) {
      this.startLoading();
      this.apiService
        .addToFavorites(this.user_id, this.favorite_user_id)
        .toPromise()
        .then((data) => {
          this.stopLoading();
          this.is_favorite = !this.is_favorite;
        })
        .catch((error) => {
          this.stopLoading();
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
