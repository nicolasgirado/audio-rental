import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(public loginService: LoginService) {}

	canActivate() {
		if (this.loginService.usuario.role === 'ADMIN_ROLE') {
			return true;
		} else {
			console.log('Bloqueado por el admin guard');
			this.loginService.logoutUsuario();
			return false;
		}
	}
}
