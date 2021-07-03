import { HttpClient } from '@angular/common/http';
import * as Bucket from '@spica-devkit/bucket';
import { from, Observable } from 'rxjs';

export class SpicaClient {
  apiUrl: string;
  visitorApiKey: string;
  constructor(api: string, visitorApiKey: string, public http: HttpClient) {
    this.apiUrl = api;
    this.visitorApiKey = visitorApiKey;
  }
  createResource<T>(bucket) {
    return new SpicaResource<T>(bucket, this);
  }
  registerCloudFunction<T, T2>(functionName: string) {
    return new SpicaCloudFunction<T, T2>(functionName, this);
  }
}
export class SpicaCloudFunction<T, T2> {
  constructor(private functionName: string, public spicaClient: SpicaClient) {}

  post() {
    return (params: T) => {
      return this.spicaClient.http.post(
        `${this.spicaClient.apiUrl}fn-execute/${this.functionName}`,
        params
      ) as Observable<T2>;
    };
  }

  get() {
    return (params: T) => {
      return this.spicaClient.http.get(
        `${this.spicaClient.apiUrl}fn-execute/${this.functionName}`,
        params
      ) as Observable<T2>;
    };
  }

  put() {
    return (params: T) => {
      return this.spicaClient.http.put(
        `${this.spicaClient.apiUrl}fn-execute/${this.functionName}`,
        params
      ) as Observable<T2>;
    };
  }

  patch() {
    return (params: T) => {
      return this.spicaClient.http.patch(
        `${this.spicaClient.apiUrl}fn-execute/${this.functionName}`,
        params
      ) as Observable<T2>;
    };
  }

  delete() {
    return (params: T) => {
      return this.spicaClient.http.delete(
        `${this.spicaClient.apiUrl}fn-execute/${this.functionName}`,
        params
      ) as Observable<T2>;
    };
  }

  head() {
    return (params: T) => {
      return this.spicaClient.http.head(
        `${this.spicaClient.apiUrl}fn-execute/${this.functionName}`,
        params
      ) as Observable<T2>;
    };
  }
}

export class SpicaResource<T> {
  private resourceBucketId: string;
  constructor(resourceBucketId: string, public spicaClient: SpicaClient) {
    this.resourceBucketId = resourceBucketId;
  }
  private init() {
    let initializeConfig;
    if (localStorage.getItem('spica_token')) {
      initializeConfig = {
        publicUrl: this.spicaClient.apiUrl,
        identity: localStorage.getItem('spica_token'),
      };
    } else {
      initializeConfig = {
        publicUrl: this.spicaClient.apiUrl,
        apikey: this.spicaClient.visitorApiKey,
      };
    }
    Bucket.initialize(initializeConfig);
  }

  post(data: T) {
    this.init();
    data = this.normalizeData(data);
    return from(
      Bucket.data.insert(this.resourceBucketId, data)
    ) as Observable<T>;
  }

  get(
    documentId: string,
    options?: { headers?: {}; queryParams?: {} }
  ): Observable<T> {
    this.init();
    return from(
      Bucket.data.get(this.resourceBucketId, documentId, options)
    ) as Observable<T>;
  }

  getAll(options?: { headers?: {}; queryParams?: {} }): Observable<T[]> {
    this.init();
    return from(
      Bucket.data.getAll(this.resourceBucketId, options)
    ) as Observable<T[]>;
  }

  update(documentId: string, data: T) {
    this.init();
    data = this.normalizeData(data);
    return from(Bucket.data.update(this.resourceBucketId, documentId, data));
  }

  remove(documentId: string) {
    this.init();
    return from(Bucket.data.remove(this.resourceBucketId, documentId));
  }

  patch(documentId: string, data: T) {
    this.init();
    data = this.normalizeData(data);
    return from(Bucket.data.patch(this.resourceBucketId, documentId, data));
  }

  getRealtime(documentId: string) {
    this.init();
    return Bucket.data.realtime.get(this.resourceBucketId, documentId);
  }

  getAllRealtime(queryParams?: {}): any {
    this.init();
    return Bucket.data.realtime.getAll(this.resourceBucketId, queryParams);
  }

  private normalizeData(originalData) {
    let data = { ...originalData };
    Object.entries(data).forEach(([field, value]) => {
      if (data[field] && data[field][0] && data[field][0]._id) {
        data[field] = data[field].map((item) => item._id);
      }
      if (data[field] && data[field]._id) {
        data[field] = data[field]._id;
      }
    });
    return data;
  }
}
