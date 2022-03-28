import {
  Injectable
} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    console.log('AQUi', request.url.endsWith('bcp/v1/security/authenticate'))
    if (!request.url.endsWith('bcp/v1/security/authenticate')) {
        console.log('AAAA')
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(request);
  }
}
