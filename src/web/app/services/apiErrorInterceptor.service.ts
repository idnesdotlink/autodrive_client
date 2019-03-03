import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { ApiService } from '@services/api.service'

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ApiErrorInterceptorService implements HttpInterceptor {

  constructor(private api: ApiService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(err => {
          const error = err.error.message || err.statusText;
          if (err instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>err).status) {
              case 400:
                return this.handle400(err);
              case 401:
                return this.handle401(request, next, err);
              case 403:
                return this.handle403(err);
              default:
                return this.other(error);
            }
          }
          // another error
          return throwError(error);
        })
      )
  }

  handle400(err: HttpErrorResponse) {
    const error = err.error.message || err.statusText;
    this.api.logout();
    return throwError(error);
  }

  handle403(err: HttpErrorResponse) {
    const error = err.error.message || err.statusText;
    this.api.logout();
    return throwError(error);
  }

  handle401(req: HttpRequest<any>, next: HttpHandler, err: HttpErrorResponse) {
    const error = err.error.message || err.statusText;
    this.api.logout();
    return throwError(error);
  }

  other(err: HttpErrorResponse) {
    // const error = err.error.message || err.statusText;
    console.log({ err: err })
    return throwError(err);
  }
}
