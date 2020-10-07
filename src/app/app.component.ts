import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RoutesRecognized } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //constants
  token;
  loginState = false;
  title = 'linkomya';
  activeUrl: string;
  routeData = new Subject();

  constructor(
    private authService: AuthService,
    public router: Router,
    private titleService: Title
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

  logout() {
    this.authService.logout();
    location.reload();
  }
}
