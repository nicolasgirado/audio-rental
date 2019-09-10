import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
	constructor(public authService: AuthService) {}

	canActivate() {
		if (this.authService.isAdmin) {
			return true;
		} else {
			console.log('Blocked by the admin guard');
			this.authService.logout();
			return false;
		}
	}
}
