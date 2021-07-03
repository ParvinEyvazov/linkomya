import { Injectable } from '@angular/core';
import * as Identity from '@spica-devkit/identity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor() {
    let initializeConfig = {
      publicUrl: environment.url,
      apikey: environment.public_api_key,
    };

    Identity.initialize(initializeConfig);
  }

  async isTokenVerified(token: string) {
    let verify_info;

    let decoded_token = await Identity.verifyToken(token).catch((_) => {
      verify_info = false;
    });

    if (decoded_token) {
      verify_info = true;
    } else {
      verify_info = false;
    }

    return verify_info;
  }
}
