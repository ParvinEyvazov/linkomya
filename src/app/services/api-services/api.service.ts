import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Connection, User } from '../../interfaces/data';

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

  checkUsername(username) {
    const url = this.getFunctionUrl(environment.function.check_username);

    return this.http.post(url, { username });
  }

  postUsername(username) {
    const url = this.getFunctionUrl(environment.function.post_username);

    return this.http.post(url, { username });
  }

  private getBucketUrl(bucket_id) {
    return environment.url + 'bucket/' + bucket_id + 'data';
  }

  private getFunctionUrl(function_name) {
    return environment.url + 'fn-execute/' + function_name;
  }
}
