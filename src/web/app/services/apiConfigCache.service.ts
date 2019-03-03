import { CacheService } from '@services/cache.service'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class ApiConfigCacheService {

  private _group: string;
  private _key: BehaviorSubject<string>;
  private _url: BehaviorSubject<string>;
  url$: Observable<string>;
  key$: Observable<string>;

  constructor(private cache: CacheService) {
    this._group = 'config'
    this._key = new BehaviorSubject(null)
    this._url = new BehaviorSubject(null)
    this.key$ = this._key.asObservable();
    this.url$ = this._url.asObservable();
    const group = this.cache.group(this._group);
    group.get('key').subscribe((key: string) => this._key.next(key))
    group.get('url').subscribe((url: string) => this._url.next(url))
  }

  private _save(name: string, value: string) {
    const group = this.cache.group(this._group);
    const action$ = (value === null) ? group.delete(name) : group.set(name, value)
    return action$.pipe(
      mergeMap(
        (status: boolean) => {
          if (status) this[`_${name}`].next(value)
          return of(status)
        }
      )
    )
  }

  get url() {
    return this._url.value
  }

  get key() {
    return this._key.value
  }

  set key(key) {
    this._save('key', key).subscribe()
  }

  set url(url) {
    this._save('url', url).subscribe()
  }

  clear() {
    this.key = null
    this.url = null
  }
}
