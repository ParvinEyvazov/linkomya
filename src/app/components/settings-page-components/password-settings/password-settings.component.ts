import { Component, OnInit } from '@angular/core';
import { ChangePassword } from 'src/app/interfaces/data';

@Component({
  selector: 'password-settings',
  templateUrl: './password-settings.component.html',
  styleUrls: ['./password-settings.component.scss'],
})
export class PasswordSettingsComponent implements OnInit {
  passwords: ChangePassword = {
    previous: '',
    new: '',
    confirmed: '',
  };
  error: string;
  loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  save() {}
}
