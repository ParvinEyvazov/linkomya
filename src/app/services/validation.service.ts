import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  validateEmail(email: string) {
    var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (mailformat.test(String(email).toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  validatePassword(password: string) {
    if (password.length > 5) {
      return true;
    } else {
      return false;
    }
  }

  validateFullname(fullname: string) {
    if (fullname.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
