import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RoutesRecognized } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from './interfaces/data';
import { ApiService } from './services/api-services/api.service';
import { AuthService } from './services/auth-services/auth.service';
import { PageSpinnerService } from '../app/services/spinner-services/page-spinner/page-spinner.service';
import { ChangeDetectorRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { timeStamp } from 'console';

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
  page_loading: boolean = true;

  constructor(
    private authService: AuthService,
    public router: Router,
    private titleService: Title,
    private apiService: ApiService,
    private pageSpinnerService: PageSpinnerService,
    private cdRef: ChangeDetectorRef
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 993) {
      this.clearSearchList();
    }
  }

  ngOnInit(): void {
    this.init();

    this.router.events.subscribe((data) => {
      this.activeUrl = this.router.url;
      if (data instanceof RoutesRecognized) {
        this.routeData.next(data);
      }
    });

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
        this.clearSearchList();
      }
    });
    this.input.update.pipe().subscribe((value) => {
      if (value) {
        if (value.length == 0) {
          this.clearSearchList();
        }
      } else {
        this.clearSearchList();
      }
    });
  }

  init() {
    this.pageSpinnerService.getSpinner().subscribe((state) => {
      this.page_loading = state;
      this.cdRef.detectChanges();
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

  navigateSearchPage(search_text) {
    this.router.navigate(['search'], {
      queryParams: { search_text: search_text },
    });
  }

  startSearchLoading() {
    this.search_loading = true;
  }

  stopSearchLoading() {
    this.search_loading = false;
  }

  clearSearchList() {
    this.users = [];
  }

  logout() {
    this.authService.logout();
    location.reload();
  }
}
