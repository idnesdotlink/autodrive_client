import {Injectable} from '@angular/core'
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router'
import {map} from 'rxjs/operators'
import {ApiService} from '@services/api.service'

@Injectable({ providedIn: 'root' })
export class InstallGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  private _checkInstalled() {
    return this.api.installed().pipe(
      map(installed => {
        if (installed) {
          return true;
        } else {
          this.router.navigate(['/install']);
          // return true;
        }
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._checkInstalled();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._checkInstalled();
  }

}
