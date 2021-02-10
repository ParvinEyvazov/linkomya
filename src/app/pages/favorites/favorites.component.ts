import { Component, OnInit } from '@angular/core';
import { Favorites } from 'src/app/interfaces/data';
import { ApiService } from 'src/app/services/api-services/api.service';
import { UserService } from 'src/app/services/user-services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  user_id: string;
  favorites: Favorites[];
  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.user_id = this.userService.getUserId();
    this.getFavorites();
  }

  getFavorites() {
    this.apiService
      .getFavorites()
      .toPromise()
      .then((data) => {
        this.favorites = data;
      });
  }
}
