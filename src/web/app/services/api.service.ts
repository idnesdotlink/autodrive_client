import {HttpClient, HttpHeaders} from '@angular/common/http'
import {LocalStorage} from '@ngx-pwa/local-storage'
import {Injectable} from '@angular/core'
import {OnDestroy} from '@angular/core'
import {Observable, of, Subject} from 'rxjs'
import {first, mergeMap, takeUntil, map} from 'rxjs/operators'
import {config} from '@configs'
import env from '@environtment'

interface base {
  host: string;
  secure: boolean;
  key: string;
  port: number;
}

interface api {
  baseUrl: string;
  endPoint: string[]
}
interface conf {
  base: base;
  api: api;
}

@Injectable()
export class ApiService implements OnDestroy {
  private subject$ = new Subject();

  constructor(private http: HttpClient, private storage: LocalStorage) { }

  registry() {}

  get baseUrl() {
    return this.storage.getItem('config')
    .pipe(
      map(
        (config: base) => {
          const {host, secure, port} = config;
          const protocol = secure ? 'https://' : 'http://'
          const portString = (port === 80) ? '' : `:${port}`
          return `${protocol}${host}${portString}`
        }
      )
    )
  }

  post(endPoint: string, data: any) {
    const source$ = this.baseUrl
    return source$.pipe(
      mergeMap((url: string) => this.http.post(url + '/' +`${endPoint}`, data).pipe(takeUntil(this.subject$)))
    )
  }

  get() {
  }

  cancel() {
    this.subject$.next()
    this.subject$.complete()
  }

  ngOnDestroy() {
    this.cancel()
  }
}
