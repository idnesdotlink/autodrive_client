import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'

import { AuthenticationCacheService } from '@services/authenticationCache.service'
import { mergeMap } from 'rxjs/operators';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ApiTokenInterceptorService implements HttpInterceptor {
  constructor(private authCache: AuthenticationCacheService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authCache.access_token$.pipe(
      mergeMap(
        (token: string) => {
          if (request.url.indexOf('authenticate') < 1 || token === null) {
            return next.handle(request)
          } else {
            return next.handle(
              request.clone({
                setHeaders: { Authorization: 'Bearer ' + token }
              })
            )
          }
        }
      )
    )
  }
}
