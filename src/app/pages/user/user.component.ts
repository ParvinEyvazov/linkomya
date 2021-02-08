import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Connection, User } from 'src/app/interfaces/data';
import { ApiService } from 'src/app/services/api-services/api.service';
import { UserService } from 'src/app/services/user-services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: User;
  user_loading: boolean = true;
  connections: Connection[];
  is_own_profile: boolean = true;
  is_favorite: boolean = false;
  is_logged_in: boolean = false;

  favorite_loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.userService.getUserId()) {
      this.is_logged_in = true;
    } else {
      this.is_logged_in = false;
    }

    this.route.params.subscribe((data) => {
      this.getUser(data.username);
    });
  }

  getUser(username) {
    this.apiService
      .getUserWithUsername(username)
      .toPromise()
      .then((data) => {
        this.stopUserLoading();
        if (data.length > 0) {
          this.user = data[0];
          this.getConnections(this.user._id);
          if (this.is_logged_in) {
            this.isOwnProfile(this.user._id);
          }
        }
      })
      .catch((error) => {
        this.stopUserLoading();
      });
  }

  getConnections(user_id) {
    this.apiService
      .getConnections(user_id)
      .toPromise()
      .then((data) => {
        this.connections = data;
      })
      .catch((error) => {});
  }

  isOwnProfile(user_id) {
    if (user_id == this.userService.getUserId()) {
      this.is_own_profile = true;
      this.stopFavoriteLoading();
    } else {
      this.is_own_profile = false;
      this.isFavorite(this.userService.getUserId(), user_id);
    }

    console.log(this.is_own_profile);
  }

  isFavorite(user_id, favorite_user_id) {
    this.apiService
      .checkFavoriteRelation(user_id, favorite_user_id)
      .toPromise()
      .then((data) => {
        if (data == true) {
          this.is_favorite = true;
        } else if (data == false) {
          this.is_favorite = false;
        }
        this.stopFavoriteLoading();
      })
      .catch((error) => {
        this.stopFavoriteLoading();
      });
  }

  stopUserLoading() {
    this.user_loading = false;
  }

  startFavoriteLoading() {
    this.favorite_loading = true;
  }

  stopFavoriteLoading() {
    this.favorite_loading = false;
  }

  addToFavorites() {
    if (this.is_favorite == true) {
      this.startFavoriteLoading();
      this.apiService
        .deleteFromFavorites(this.userService.getUserId(), this.user._id)
        .toPromise()
        .then((data) => {
          this.stopFavoriteLoading();
          this.is_favorite = !this.is_favorite;
        })
        .catch((error) => {
          this.stopFavoriteLoading();
        });
    } else if (this.is_favorite == false) {
      this.startFavoriteLoading();
      this.apiService
        .addToFavorites(this.userService.getUserId(), this.user._id)
        .toPromise()
        .then((data) => {
          this.stopFavoriteLoading();
          this.is_favorite = !this.is_favorite;
        })
        .catch((error) => {
          this.stopFavoriteLoading();
        });
    }
  }
}
