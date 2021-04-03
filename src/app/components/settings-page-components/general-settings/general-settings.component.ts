import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/data';

@Component({
  selector: 'general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
})
export class GeneralSettingsComponent implements OnInit {
  user: User = {
    fullname: 'aa',
    country: 'a',
    city: 'a',
    job: 'a',
  };
  loading: boolean = false;
  error: string;

  constructor() {}

  ngOnInit(): void {}

  save() {}
}
