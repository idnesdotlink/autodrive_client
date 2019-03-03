import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { throwError, of, from } from 'rxjs'
import { map, catchError, retry, mergeMap, first } from 'rxjs/operators'
import { AuthenticationCacheService } from '@services/authenticationCache.service'
import { ApiConfigCacheService } from '@services/apiConfigCache.service'
import { Router } from '@angular/router'

export interface BaseConfig {
  secure: boolean;
  host: string;
  port: number;
  key: string;
}
@Injectable(
  {
    providedIn: 'root'
  }
)
export class ApiService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigCacheService,
    private authCache: AuthenticationCacheService,
    private router: Router
  ) { }

  installed() {
    return of(true)
  }

  verify(url: string, key: string) {
    return this.http.post(url, { key })
      .pipe(
        catchError(() => of(false)),
        map(verified => (verified === true))
      )
  }

  install(base: BaseConfig) {
    const { host, secure, port, key } = base;
    const url = `${(secure ? 'https' : 'http')}://${host}:${port}`;
    this.verify(url, key).subscribe()
    this.apiConfig.url = url;
    this.apiConfig.key = key;
    return of(true)
  }

  login(email: string, password: string, url: string) {
    return this.post('authenticate', { email, password })
      .pipe(
        first(),
        catchError(() => of(null)),
        mergeMap((token: string) => this.authCache.login(token)),
        mergeMap(() => from(this.router.navigate([url]))),
        mergeMap(x => {
          return (x) ? of(x) : throwError(x)
        })
      );
  }

  logout() {
    return this.authCache.logout()
  }

  post(url: string, body: any) {
    url = `${this.apiConfig.url}/${url}`
    return this.http.post(url, body, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    })
  }

  get authToken() {
    return this.authCache.authToken
  }

  get(url: string) {
    return this.http.get(url)
  }
}
