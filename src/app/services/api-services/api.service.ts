import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  Connection,
  Favorites,
  SearchResult,
  SocialMedia,
  User,
} from '../../interfaces/data';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUser(user_id) {
    const filter = {
      _id: user_id,
    };
    const url = this.getBucketUrl(environment.bucket.user);

    return this.http.get<User[]>(url, {
      params: {
        filter: JSON.stringify(filter),
      },
    });
  }

  getAllSocialMedia() {
    const url = this.getBucketUrl(environment.bucket.socialMedia);

    return this.http.get<SocialMedia[]>(url);
  }

  checkUsername(username) {
    const url = this.getFunctionUrl(environment.function.check_username);

    return this.http.post(url, { username });
  }

  postUsername(username) {
    const url = this.getFunctionUrl(environment.function.post_username);

    return this.http.post(url, { username });
  }

  getConnections(user_id) {
    const filter = {
      'user._id': user_id,
      status: false,
    };

    const url = this.getBucketUrl(environment.bucket.connection);

    return this.http.get<Connection[]>(url, {
      params: {
        filter: JSON.stringify(filter),
        relation: 'true',
      },
    });
  }

  addNewConnection(social_media_id, link) {
    const url = this.getFunctionUrl(environment.function.add_new_connection);

    return this.http.post(url, { social_media_id, link });
  }

  editConnection(connection_id, link) {
    const url = this.getFunctionUrl(environment.function.edit_connection);

    return this.http.post(url, { connection_id, link });
  }

  deleteConnection(connection_id) {
    const url = this.getFunctionUrl(environment.function.delete_connection);

    return this.http.post(url, { connection_id });
  }

  uploadPhoto(photo_url, is_profile_photo) {
    const url = this.getFunctionUrl(environment.function.upload_photo);

    const data = {
      url: photo_url,
      is_profile_photo: is_profile_photo,
    };

    return this.http.post(url, data);
  }

  updateUser(user: User) {
    const url = this.getFunctionUrl(environment.function.update_user);

    return this.http.post(url, { user });
  }

  deleteAccount(user_id) {
    const url = this.getFunctionUrl(environment.function.delete_account);

    return this.http.post(url, { user_id }).pipe(
      tap((_) => {
        this.cleanLocalStorage();
      })
    );
  }

  getUserWithUsername(username) {
    const filter = {
      username: username,
    };
    const url = this.getBucketUrl(environment.bucket.user);

    return this.http.get<User[]>(url, {
      params: {
        filter: JSON.stringify(filter),
      },
    });
  }

  checkFavoriteRelation(user_id, favorite_user_id) {
    const url = this.getFunctionUrl(
      environment.function.check_favorite_relation
    );

    return this.http.post(url, {
      user_id: user_id,
      favorite_user_id: favorite_user_id,
    });
  }

  addToFavorites(user_id, favorite_user_id) {
    const url = this.getFunctionUrl(environment.function.add_to_favorites);

    return this.http.post(url, { user_id, favorite_user_id });
  }

  deleteFromFavorites(user_id, favorite_user_id) {
    const url = this.getFunctionUrl(environment.function.delete_from_favorites);

    return this.http.post(url, { user_id, favorite_user_id });
  }

  getSearchedUsers(search_text, max_limit?) {
    const url = this.getFunctionUrl(environment.function.search_user);

    let filter = `?search_text=${search_text}`;
    max_limit != undefined ? (filter += `&max_limit=${max_limit}`) : undefined;

    // let filter = {
    //   search_text: search_text,
    //   max_limit: max_limit,
    // };

    return this.http.get<SearchResult>(url + filter);
  }

  getFavorites() {
    const url = this.getFunctionUrl(environment.function.get_favorites);

    return this.http.get<Favorites[]>(url);
  }

  private getBucketUrl(bucket_id) {
    return environment.url + 'bucket/' + bucket_id + 'data';
  }

  private getFunctionUrl(function_name) {
    return environment.url + 'fn-execute/' + function_name;
  }

  private cleanLocalStorage() {
    localStorage.clear();
  }
}
