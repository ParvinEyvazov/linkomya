import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RoutesRecognized } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from './interfaces/data';
import { ApiService } from './services/api-services/api.service';
import { AuthService } from './services/auth-services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('input') input;

  //constants
  token;
  loginState = false;
  title = 'linkomya';
  activeUrl: string;
  routeData = new Subject();

  search_text: string = '';
  search_loading: boolean = false;
  users: User[];

  constructor(
    private authService: AuthService,
    public router: Router,
    private titleService: Title,
    private apiService: ApiService
  ) {}

  //functions
  ngOnInit(): void {
    this.router.events.subscribe((data) => {
      this.activeUrl = this.router.url;
      if (data instanceof RoutesRecognized) {
        this.routeData.next(data);
      }
    });

    //works when path change
    this.routeData.subscribe((data: any) => {
      this.setToken();
      this.setTitle(data);
    });
  }

  ngAfterViewInit() {
    this.input.update.pipe(debounceTime(500)).subscribe((value) => {
      if (value) {
        value.length == 0 ? (this.users = []) : this.getUsers(value);
      } else {
        this.users = [];
      }
    });
    this.input.update.pipe().subscribe((value) => {
      if (value) {
        if (value.length == 0) {
          this.users = [];
        }
      } else {
        this.users = [];
      }
    });
  }

  getUsers(search_text) {
    this.startSearchLoading();
    this.apiService
      .getSearchedUsers(search_text, 3)
      .toPromise()
      .then((data) => {
        this.users = data.users;
        this.stopSearchLoading();
      })
      .catch((error) => {
        this.stopSearchLoading();
      });
  }

  setToken() {
    //if there is not any token
    if (!localStorage.getItem('token')) {
      this.authService.logout();
      this.loginState = false;
    }
    // has already token
    else {
      this.token = localStorage.getItem('token');
      this.loginState = true;
    }
  }

  //set the title for each page
  setTitle(data) {
    if (data['url']) {
      let title =
        data['url'] != '/'
          ? data['url']
              .substring(1, data['url'].length)
              .charAt(0)
              .toUpperCase() +
            data['url'].substring(1, data['url'].length).substring(1)
          : ' Welcome';

      this.titleService.setTitle('Linkomya | ' + title);
    }
  }

  startSearchLoading() {
    this.search_loading = true;
  }

  stopSearchLoading() {
    this.search_loading = false;
  }

  logout() {
    this.authService.logout();
    location.reload();
  }
}
