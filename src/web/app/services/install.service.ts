import {HttpClient, HttpHeaders} from '@angular/common/http'
import {LocalStorage} from '@ngx-pwa/local-storage'
import {Injectable} from '@angular/core'
import {Observable, of} from 'rxjs'
import {map, first, concatAll} from 'rxjs/operators'
import {config} from '@configs'

export interface BaseConfig {
  secure: boolean;
  host: string;
  port: number;
  key: string;
}

@Injectable()
export class InstallService {

  constructor(private http: HttpClient, private storage: LocalStorage) { }

  installed(): Observable<BaseConfig> {
    return this.storage.getItem('config').pipe(
      first<BaseConfig>()
    )
  }

  uninstall(): Observable<boolean> {
    return this.storage.removeItem('config');
  }

  install(base: BaseConfig) {
    let {host, secure, port, key} = base;
    const protocol = secure ? 'https://' : 'http://'
    const baseUrl = `${protocol}${host}:${port}`
    const apiEndPoint = `/api/verify`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
    const verify = this.http.post(baseUrl + apiEndPoint, {key}, {headers})
    verify.subscribe(
      v => console.log(v),
      e => console.log(e),
      () => console.log('complete')
    )
    return this.storage.setItem('config', base)
  }
}
