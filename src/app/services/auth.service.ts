import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LoginService } from './login.service';
import { Usuario } from '../shared/models/usuario';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	isLoggedIn = false;
	isAdmin = false;
	currentUsuario: Usuario = new Usuario();
	currentToken = null;

	constructor(
		private loginService: LoginService,
		private router: Router,
		private jwtHelper: JwtHelperService
	) {
		this.currentToken = localStorage.getItem('token');
		if (this.currentToken) {
			if (this.jwtHelper.isTokenExpired(this.currentToken)) {
				localStorage.removeItem('token');
				this.currentToken = null;
				this.isLoggedIn = false;
				this.isAdmin = false;
				this.currentUsuario = new Usuario();
				this.router.navigate([ '/login' ]);
			} else {
				const decodedUsuario = this.decodeUsuarioFromToken(this.currentToken);
				this.setCurrentUsuario(decodedUsuario);
			}
		}
	}

	decodeUsuarioFromToken(token) {
		return this.jwtHelper.decodeToken(token).usuario;
	}

	setCurrentUsuario(decodedUsuario: Usuario) {
		this.isLoggedIn = true;
		this.currentUsuario._id = decodedUsuario._id;
		this.currentUsuario.nombre = decodedUsuario.nombre;
		this.currentUsuario.email = decodedUsuario.email;
		this.currentUsuario.role = decodedUsuario.role;
		decodedUsuario.role === 'ADMIN' ? (this.isAdmin = true) : (this.isAdmin = false);
		delete decodedUsuario.role;
	}

	login(credenciales: any) {
		return this.loginService.login(credenciales).pipe(
			map((res: any) => {
				localStorage.setItem('token', res.token);
				this.currentToken = res.token;
				const decodedUsuario = this.decodeUsuarioFromToken(res.token);
				this.setCurrentUsuario(decodedUsuario);
				return this.isLoggedIn;
			})
		);
	}

	logout() {
		return this.loginService.logout(this.currentUsuario).subscribe(() => {
			localStorage.removeItem('token');
			this.currentToken = null;
			this.isLoggedIn = false;
			this.isAdmin = false;
			this.currentUsuario = new Usuario();
			this.router.navigate([ '/login' ]);
			return true;
		});
	}

	logoutAll() {
		return this.loginService.logoutAll(this.currentUsuario).subscribe(() => {
			localStorage.removeItem('token');
			this.currentToken = null;
			this.isLoggedIn = false;
			this.isAdmin = false;
			this.currentUsuario = new Usuario();
			this.router.navigate([ '/login' ]);
			return true;
		});
	}
}
