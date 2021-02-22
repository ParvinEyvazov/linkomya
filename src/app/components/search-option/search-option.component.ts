import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'search-option',
  templateUrl: './search-option.component.html',
  styleUrls: ['./search-option.component.scss'],
})
export class SearchOptionComponent implements OnInit {
  @Input() url: string;
  @Input() fullname: string;
  @Input() username: string;
  default_photo = '../../../assets/profile_photos/default_profile_photo.png';

  constructor() {}

  ngOnInit(): void {
    this.url == undefined ? (this.url = this.default_photo) : undefined;
  }
}
