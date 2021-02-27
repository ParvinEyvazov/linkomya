import { Component, OnInit } from '@angular/core';
import { Favorites } from 'src/app/interfaces/data';
import { ApiService } from 'src/app/services/api-services/api.service';
import { PageSpinnerService } from 'src/app/services/spinner-services/page-spinner/page-spinner.service';
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
    private apiService: ApiService,
    private pageSpinnerService: PageSpinnerService
  ) {}

  ngOnInit(): void {
    this.user_id = this.userService.getUserId();
    this.getFavorites();
  }

  getFavorites() {
    this.pageSpinnerService.start();
    this.apiService
      .getFavorites()
      .toPromise()
      .then((data) => {
        this.favorites = data;
        this.pageSpinnerService.stop();
      })
      .catch((error) => {
        this.pageSpinnerService.reset();
      });
  }
}
