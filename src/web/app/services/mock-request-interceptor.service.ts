import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import {catchError, filter} from 'rxjs/operators'
import {Injectable} from '@angular/core'
import {config} from '@configs'

@Injectable()
export class MockRequestInterceptorService implements HttpInterceptor {


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
  }

  handleRequestLevel() {

  }

  handleRequestMember() {

  }
}
