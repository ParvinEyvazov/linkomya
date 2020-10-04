import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = {
      Authorization: 'APIKEY 405opg1kfvo5ie1',
    };

    if (this.authService.token) {
      headers['X-Authorization'] = this.authService.token;
    }

    request = request.clone({
      setHeaders: headers,
    });
    // console.log("Interceptor with token :",!!this.authService.token)
    return next.handle(request);
  }
}
