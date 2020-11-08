import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/data';

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

  getBucketUrl(bucket_id) {
    return environment.url + 'bucket/' + bucket_id + 'data';
  }
}
