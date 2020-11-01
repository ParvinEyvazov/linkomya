import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private token: any;
  private fullname: any;
  private expire: any;
  private username: any;
  private user_id: any;

  constructor() {
    this.token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : undefined;
    this.fullname = localStorage.getItem('fullname')
      ? localStorage.getItem('fullname')
      : undefined;
    this.expire = localStorage.getItem('expire')
      ? localStorage.getItem('expire')
      : undefined;
    this.username = localStorage.getItem('username')
      ? localStorage.getItem('username')
      : undefined;
    this.user_id = localStorage.getItem('user_id')
      ? localStorage.getItem('user_id')
      : undefined;
  }

  getToken() {
    return this.token;
  }

  getFullname() {
    return this.fullname;
  }

  getUsername() {
    return this.username;
  }

  getUserId() {
    let decoded_token = jwt_decode(this.token);
    return decoded_token['_id'];
  }
}
