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
            this.isFavorite(this.userService.getUserId(), this.user._id);
          } else {
          }
        } else {
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
    } else {
      this.is_own_profile = false;
    }
  }

  isFavorite(user_id, favorite_user_id) {
    this.apiService
      .checkFavoriteRelation(user_id, favorite_user_id)
      .toPromise()
      .then((data) => {
        console.log('data: ');
        if (data == true) {
          this.is_favorite = true;
        } else if (data == false) {
          this.is_favorite = false;
        }
      })
      .catch((error) => {
        console.log('err: ', error);
      });
    console.log(user_id, favorite_user_id);
  }

  stopUserLoading() {
    this.user_loading = false;
  }

  makeFavorite() {
    this.is_favorite = !this.is_favorite;
  }
}
