import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() username: string;
  @Input() profile_photo: string;
  @Input() name: string;
  @Input() country: string;

  constructor() {}

  ngOnInit(): void {}
}
