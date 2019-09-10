import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {
	constructor(public authService: AuthService, public router: Router) {}

	canActivate() {
		if (this.authService.isLoggedIn) {
			return true;
		} else {
			console.log('Blocked by the login guard');
			this.router.navigate([ '/login' ]);
			return false;
		}
	}
}
