import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  Connection,
  Favorites,
  SocialMedia,
  User,
  VerifiedUser,
} from '../../interfaces/spica.data';
import {
  TestRequest,
  TestResposne,
} from '../../interfaces/spica.function.data';
import { SpicaClient } from './spica.facade';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private spicaClient = new SpicaClient(
    environment.url,
    environment.public_api_key,
    this.httpClient
  );

  env = environment.bucket;

  public resource = {
    user: this.spicaClient.createResource<User>(this.env.user),
    socialMedia: this.spicaClient.createResource<SocialMedia>(
      this.env.socialMedia
    ),
    connection: this.spicaClient.createResource<Connection>(
      this.env.connection
    ),
    favorites: this.spicaClient.createResource<Favorites>(this.env.favorites),
    verifiedUser: this.spicaClient.createResource<VerifiedUser>(
      this.env.verifiedUser
    ),
  };

  public cloud_function = {
    testLogin: this.spicaClient
      .registerCloudFunction<TestRequest, TestResposne>('TEST-FUNCTION-NAME')
      .post(),
  };

  constructor(private httpClient: HttpClient) {}
}
