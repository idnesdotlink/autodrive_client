import {Injectable} from '@angular/core'
import {Router, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import {map} from 'rxjs/operators'
import {AuthenticationService} from '@services/authentication.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authenticationService.get_access_token_observable.pipe(
      map(access_token => {
        if (access_token) {
          return true;
        } else {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      })
    );
  }
}
