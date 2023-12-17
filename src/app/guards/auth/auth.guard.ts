import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard {
  public constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    // Benutzer aus dem AuthenticationService holen
    const user = this.authenticationService.userValue;

    // Standardrolle festlegen, wenn der Benutzer null ist
    const defaultRole = user?.authentication?.role || 'user';

    if (route.data['role'] === undefined || route.data['role'] === defaultRole) {
      return true;
    } else {
      alert('Du kommst hier nicht rein!');
      this.router.navigate(['/login']);
      return false;
    }
  }
};
