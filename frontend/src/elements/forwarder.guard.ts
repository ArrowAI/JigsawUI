import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ForwarderGuard implements CanActivate{

  constructor(
	private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot) {
	this.router.navigate([`/${route.params['id']}`]);
	return false;
  }
}