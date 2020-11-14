import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = {
      Authorization: `APIKEY ${environment.public_api_key}`,
    };

    if (this.authService.token) {
      headers['X-Authorization'] = this.authService.token;
    }

    request = request.clone({
      setHeaders: headers,
    });
    return next.handle(request);
  }
}
