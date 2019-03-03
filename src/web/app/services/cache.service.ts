import { Injectable } from '@angular/core'
import { LocalStorage } from '@ngx-pwa/local-storage'
import { map, filter, flatMap, mergeMap, toArray } from 'rxjs/operators'
import { from, Observable } from 'rxjs'

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CacheService {

  private _group: string;

  constructor(private localStorage: LocalStorage) { }

  private _filterGroup(key: string) {
    return (key.indexOf('.') > 1) && (key.split('.')[0] === this._group)
  }

  private _key(key: string) {
    return `${this._group}.${key}`
  }

  private _realKeys() {
    return this.localStorage
      .keys()
      .pipe(
        flatMap(key => from(key)),
        filter(key => this._filterGroup(key)),
        toArray()
      )
  }

  group(value: string) {
    this._group = `__${value}`
    return this
  }

  count(): Observable<number> {
    return this.keys.pipe(
      map(keys => keys.length)
    )
  }

  get(key: string): Observable<string> {
    return this.localStorage
      .getItem(this._key(key))
      .pipe(
        map(
          (value: any) => {
            return value
          }
        )
      )
  }

  get keys(): Observable<string[]> {
    return this._realKeys().pipe(
      flatMap(key => from(key)),
      map(key => key.split('.')[1]),
      toArray()
    )
  }

  get values(): Observable<string> {
    return this.keys
      .pipe(
        flatMap(key => from(key)),
        mergeMap(key => this.get(key))
      )
  }

  has(key: string): Observable<boolean> {
    return this.localStorage.has(this._key(key))
  }

  set(key: string, value: any): Observable<boolean> {
    if (
      key === 'undefined' ||
      key.length < 1 ||
      /\s/g.test(key) ||
      typeof value === 'undefined' ||
      value === null
    ) throw 'wrong key or value'
    return this.localStorage.setItem(this._key(key), value)
  }

  delete(key: string): Observable<boolean> {
    return this.localStorage.removeItem(this._key(key))
  }

  deleteAll(): Observable<boolean> {
    return this.localStorage
      .keys()
      .pipe(
        flatMap(key => from(key)),
        filter(key => this._filterGroup(key)),
        mergeMap(key => this.localStorage.removeItem(key))
      )
  }
}
