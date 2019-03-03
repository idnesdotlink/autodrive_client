import { Injectable } from '@angular/core'
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router'
import { map } from 'rxjs/operators'
import { AuthenticationCacheService } from '@services/authenticationCache.service'
import { ApiService } from '@services/api.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild, CanActivate {
  constructor(
    private router: Router,
    private authCache: AuthenticationCacheService,
    private api: ApiService
  ) { }

  private _check_token(state: RouterStateSnapshot) {
    return this.authCache.access_token$.pipe(
      map(access_token => {
        if (access_token !== null) {
          return true;
        } else {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._check_token(state)
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._check_token(state)
  }
}
