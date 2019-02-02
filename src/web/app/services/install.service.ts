import {HttpClient, HttpHeaders} from '@angular/common/http'
import {LocalStorage} from '@ngx-pwa/local-storage'
import {Injectable} from '@angular/core'
import {Observable, of} from 'rxjs'
import {map, first} from 'rxjs/operators'
import {config} from '@configs'

@Injectable()
export class InstallService {
  constructor(private http: HttpClient, private storage: LocalStorage) {

  }

  installed(): Observable<boolean> {
    return this.storage.getItem('installed').pipe(
      first<boolean>()
    )
  }
  install(url: string, key: string) {
    this.http.post(`${url}/api/verify`, {key}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).subscribe(
      v => console.log(v),
      e => console.log(e),
      () => console.log('c')
    )
    return this.storage.setItem('installed', true);
  }

  verify(url: string, ) {
    this


    .http.post(`${url}/verify`, {}, {})
  }

  validate() {

  }
}
