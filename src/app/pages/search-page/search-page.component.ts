import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/interfaces/data';
import { ApiService } from 'src/app/services/api-services/api.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  @ViewChild('input') input;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private validator: ValidationService,
    private apiService: ApiService
  ) {}
  search_text: string;
  first_time_opened: boolean = true;
  users: User[];
  loading: boolean = false;
  max_limit: number = 5;
  increase_limit: number = 5;
  can_be_more: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.search_text = params['search_text'];

      if (this.first_time_opened == true) {
        if (this.validator.validateSearchText(this.search_text)) {
          this.getUsers(this.search_text);
        }
        this.first_time_opened = false;
      }
    });
  }

  ngAfterViewInit() {
    this.input.update.pipe(debounceTime(500)).subscribe((value) => {
      this.getUsers(value);
      this.changeQueryParams(this.search_text);
    });
  }

  getUsers(search_text) {
    this.startLoading();
    this.apiService
      .getSearchedUsers(search_text, this.max_limit)
      .toPromise()
      .then((data) => {
        this.users = data.users;
        this.can_be_more = data.can_be_more;
        this.stopLoading();
      });
  }

  getMore() {
    this.max_limit += this.increase_limit;
    this.getUsers(this.search_text);
  }

  changeQueryParams(search_text) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search_text: search_text },
    });
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }
}
