import {HttpClient, HttpHeaders} from '@angular/common/http'
import {LocalStorage} from '@ngx-pwa/local-storage'
import {Injectable} from '@angular/core'
import {Observable, of} from 'rxjs'
import {map, first} from 'rxjs/operators'
import {config} from '@configs'

interface installConf {
  host: string,
  port: number,
  key: string
}

@Injectable()
export class InstallService {
  constructor(private http: HttpClient, private storage: LocalStorage) {

  }

  conf(): Observable<installConf> {
    return this.storage.getItem('installed').pipe(
      first<installConf>()
    )
  }

  installed(): Observable<installConf> {
    return this.storage.getItem('installed').pipe(
      first<installConf>()
    )
  }

  install(host: string, port: number, key: string) {
    this.http.post(`${host}:${port}/api/verify`, {key}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).subscribe(
      v => console.log(v),
      e => console.log(e),
      () => console.log('c')
    )
    return this.storage.setItem('installed', {host, port, key});
  }

  verify(url: string, ) {
    this.http.post(`${url}/verify`, {}, {})
  }

  validate() {

  }
}
