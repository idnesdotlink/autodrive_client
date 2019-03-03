import { CacheService } from '@services/cache.service'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationCacheService {

  private _access_token: BehaviorSubject<string>;
  private _key: string;
  private _group: string;
  access_token$: Observable<string>;

  constructor(private cache: CacheService) {
    this._group = 'authentication'
    this._key = 'access_token'
    this._access_token = new BehaviorSubject(null)
    this.access_token$ = this._access_token.asObservable();
  }

  private _set_token(token: string) {
    const group = this.cache.group(this._group);
    const action$ = (token === null) ? group.delete(this._key) : group.set(this._key, token);
    return action$.pipe(
      mergeMap(
        (success: boolean) => {
          if (success) this._access_token.next(token)
          return of(success)
        }
      )
    )
  }

  get authToken() {
    return this._access_token.value
  }

  logout() {
    return this._set_token(null)
  }

  login(token: string) {
    return this._set_token(token)
  }

}
