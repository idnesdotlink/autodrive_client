import {Injectable} from '@angular/core'
import {LocalStorage} from '@ngx-pwa/local-storage'
import {map, filter, flatMap, mergeMap, toArray} from 'rxjs/operators'
import {SubscriptionLike, from, of, observable} from 'rxjs'

@Injectable()
export class CacheService {

  private _group: string;

  constructor(private localStorage: LocalStorage) {}

  set group(value: string) {
    this._group = `__${value}`
  }

  get group() {
    return this._group;
  }

  private filterGroup(key: string) {
    return key.indexOf('.') > 1 && key.split('.')[0] === this.group
  }

  private _key(key: string) {
    return `${this.group}.${key}`
  }

  count() {
    return this.keys().pipe(
      map(keys => keys.length)
    )
  }

  realKeys() {
    return this.localStorage.keys().pipe(
      flatMap(key => from(key)),
      filter(key => this.filterGroup(key)),
      toArray()
    )
  }

  get(key: string) {
    return this.localStorage.getItem(this._key(key))
  }

  keys() {
    return this.realKeys().pipe(
      flatMap(key => from(key)),
      map(key => key.split('.')[1]),
      toArray()
    )
  }

  values() {
    return this.keys()
    .pipe(
      flatMap(key => from(key)),
      mergeMap(key => this.get(key))
    )
  }

  has(key: string) {
    return this.localStorage.has(this._key(key))
  }

  set(key: string, value: any) {
    if(key === 'undefined' || key.length < 1 || /\s/g.test(key) || typeof value === 'undefined' || value === null) throw 'wrong key or value'
    return this.localStorage.setItem(this._key(key), value)
  }

  delete(key: string): void {
    this.localStorage.removeItem(this._key(key))
  }

  deleteAll() {
    return this.localStorage.keys().pipe(
      flatMap(key => from(key)),
      filter(key => this.filterGroup(key)),
      mergeMap(key => this.localStorage.removeItem(key))
    )
  }
}
