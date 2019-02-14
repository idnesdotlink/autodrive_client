import {Injectable} from '@angular/core'
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router'
import {map} from 'rxjs/operators'
import {InstallService} from '@services/install.service'

@Injectable({ providedIn: 'root' })
export class InstallGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private InstallService: InstallService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.InstallService.installed().pipe(
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

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.InstallService.installed().pipe(
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

}
