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

  validateUsername(username: string) {
    var wrongUsernameFormat = /^[a-zA-Z0-9._]+$/;

    if (wrongUsernameFormat.test(String(username).toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  validateLink(link: string) {
    var linkFormat = /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/;

    if (linkFormat.test(String(link).toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  updateLink(link: string) {
    if (link.includes('https://') || link.includes('http://')) {
      return link;
    } else {
      return 'https://' + link;
    }
  }
}
