import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../interfaces/data';

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
