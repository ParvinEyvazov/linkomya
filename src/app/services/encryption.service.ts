import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  constructor() {}

  encode(data: string) {
    return btoa(data);
  }

  decode(data: string) {
    return atob(data);
  }
}
