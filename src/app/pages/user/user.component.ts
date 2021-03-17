import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Connection, User } from 'src/app/interfaces/data';
import { ApiService } from 'src/app/services/api-services/api.service';
import { FavoritingSpinnerService } from 'src/app/services/spinner-services/favoriting-spinner/favoriting-spinner.service';
import { PageSpinnerService } from 'src/app/services/spinner-services/page-spinner/page-spinner.service';
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

  main_user_id: string;

  is_favorite: boolean = false;
  is_own_profile: boolean = true;
  is_logged_in: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private favoritingSpinnerService: FavoritingSpinnerService,
    private pageSpinnerService: PageSpinnerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.getUser(data.username);
    });
    this.main_user_id = this.userService.getUserId();
  }

  getUser(username) {
    this.pageSpinnerService.start();
    this.apiService
      .getUserWithUsername(username)
      .toPromise()
      .then((data) => {
        this.stopUserLoading();
        this.pageSpinnerService.stop();
        if (data.length > 0) {
          this.user = data[0];
          this.getConnections(this.user._id);
          this.handleFavoritingState();
        }
      })
      .catch((error) => {
        this.stopUserLoading();
        this.pageSpinnerService.reset();
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

  handleFavoritingState() {
    if (this.main_user_id) {
      this.is_logged_in = true;
      this.isOwnProfile(this.main_user_id, this.user._id);
    } else {
      this.is_logged_in = false;
    }
  }

  isOwnProfile(main_user_id, user_id) {
    if (main_user_id === user_id) {
      this.is_own_profile = true;
    } else {
      this.is_own_profile = false;
      this.isFavorite(main_user_id, user_id);
    }
  }

  isFavorite(main_user_id, user_id) {
    this.favoritingSpinnerService.start();
    this.apiService
      .checkFavoriteRelation(main_user_id, user_id)
      .toPromise()
      .then((data) => {
        if (data == true) {
          this.is_favorite = true;
        } else {
          this.is_favorite = false;
        }
        this.favoritingSpinnerService.stop();
      })
      .catch((error) => {
        this.favoritingSpinnerService.reset();
      });
  }

  changeFavoriteRelation(event) {
    if (this.is_favorite == event) {
      this.favoritingSpinnerService.start();
      this.is_favorite == true
        ? this.deleteFromFavorites(this.main_user_id, this.user._id)
        : this.addToFavorites(this.main_user_id, this.user._id);
    }
  }

  addToFavorites(main_user_id, user_id) {
    this.apiService
      .addToFavorites(main_user_id, user_id)
      .toPromise()
      .then((data) => {
        this.favoritingSpinnerService.stop();
        this.is_favorite = !this.is_favorite;
      })
      .catch((error) => {
        this.favoritingSpinnerService.reset();
      });
  }

  deleteFromFavorites(main_user_id, user_id) {
    this.apiService
      .deleteFromFavorites(main_user_id, user_id)
      .toPromise()
      .then((data) => {
        this.favoritingSpinnerService.stop();
        this.is_favorite = !this.is_favorite;
      })
      .catch((error) => {
        this.favoritingSpinnerService.reset();
      });
  }

  stopUserLoading() {
    this.user_loading = false;
  }
}
