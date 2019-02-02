import {HttpClient, HttpHeaders} from '@angular/common/http'
import {LocalStorage} from '@ngx-pwa/local-storage'
import {Injectable} from '@angular/core'
import {Observable, of} from 'rxjs'
import {first} from 'rxjs/operators'
import {config} from '@configs'
import env from '@environtment'

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient, private storage: LocalStorage) {
  }

  installed(): Observable<boolean> {
    return this.storage.getItem('configuration').pipe(
      first<boolean>()
    )
  }

  install() {
    return this.storage.setItem('configuration', true);
  }

  verify() {

  }

  validate() {

  }
}
