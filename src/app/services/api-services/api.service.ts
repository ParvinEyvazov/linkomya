import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Connection, SocialMedia, User } from '../../interfaces/data';
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
    const url = this.getBucketUrl(environment.bucket.social_media);

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
