import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router) {}

  search_text: string;

  ngOnInit(): void {}

  navigateSearchPage(search_text) {
    this.router.navigate(['search'], {
      queryParams: { search_text: search_text },
    });
  }
}
