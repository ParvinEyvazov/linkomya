import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  ErrorMessages = {
    email_validation: 'Invalid Email address',
    password_validation: 'Password must be at least 6 characters',
    password_not_same: 'Passwords are not same',
    fullname_validation: 'Full name must be at least 1 characters',
  };

  SuccessMessages = {};

  constructor() {}
}
