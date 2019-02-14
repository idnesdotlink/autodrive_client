import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import {catchError} from 'rxjs/operators'
import {Injectable} from '@angular/core'
import {config} from '@configs'

import {AuthenticationService} from './authentication.service'

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(request, this.authenticationService.access_token_value))
      .pipe(
        catchError(err => {
          const requesting_auth: boolean = (
            request.url === `${config.apiUrl}/users/authentication` ||
            request.url === `${config.apiUrl}/users/authentication/refresh`
          );

          const error = err.error.message || err.statusText;
          if (err instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>err).status) {
              case 400:
                return this.handle400(err);
              case 401:
                this.handle401(request, next, err);
              case 403:
                this.handle403(err);
              default:
                return throwError(error);
            }
          }
          // another error
          return throwError(error);
        })
      )
  }

  addToken(request: HttpRequest<any>, access_token: string): HttpRequest<any> {
    if (access_token === null) return request;
    return request.clone({ setHeaders: { Authorization: 'Bearer ' + access_token } })
  }

  handle400(err: HttpErrorResponse) {
    const error = err.error.message || err.statusText;
    this.authenticationService.logout();
    return throwError(error);
  }

  handle403(err: HttpErrorResponse) {
    const error = err.error.message || err.statusText;
    this.authenticationService.logout();
    return throwError(error);
  }

  handle401(req: HttpRequest<any>, next: HttpHandler, err: HttpErrorResponse) {
    const error = err.error.message || err.statusText;
    this.authenticationService.logout();
    return throwError(error);
  }
}
