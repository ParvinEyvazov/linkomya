import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Connection, User } from 'src/app/interfaces/data';
import { ApiService } from 'src/app/services/api-services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isFavorite: boolean = false;
  user: User;
  user_loading: boolean = true;
  connections: Connection[];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      console.log(data.username);
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
        } else {
        }
      })
      .catch((error) => {
        this.stopUserLoading();
        console.log('error: ', error);
      });
  }

  getConnections(user_id) {
    this.apiService
      .getConnections(user_id)
      .toPromise()
      .then((data) => {
        this.connections = data;
        console.log('connections: ', this.connections);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }

  stopUserLoading() {
    this.user_loading = false;
  }

  makeFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
