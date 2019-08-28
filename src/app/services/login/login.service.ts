import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../../models/usuario.model';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	apiUrl = environment.apiUrl;
	usuario: Usuario;
	token: string;
	menu: any[] = [];

	constructor(public http: HttpClient, public router: Router) {
		this.cargarStorage();
	}

	cargarStorage() {
		if (localStorage.getItem('token')) {
			this.token = localStorage.getItem('token');
			this.usuario = JSON.parse(localStorage.getItem('usuario'));
			this.menu = JSON.parse(localStorage.getItem('menu'));
		} else {
			this.token = '';
			this.usuario = null;
			this.menu = [];
		}
	}

	guardarStorage(token: string, usuario: Usuario, menu: any) {
		localStorage.setItem('token', token);
		localStorage.setItem('usuario', JSON.stringify(usuario));
		localStorage.setItem('menu', JSON.stringify(menu));

		this.usuario = usuario;
		this.token = token;
		this.menu = menu;
	}

	loginUsuario(usuario: Usuario, recordar: boolean = false) {
		if (recordar) {
			localStorage.setItem('email', usuario.email);
		} else {
			localStorage.removeItem('email');
		}

		return this.http.post(this.apiUrl + '/login', usuario).pipe(
			map((resp: any) => {
				this.guardarStorage(resp.token, resp.usuario, resp.menu);
				return true;
			}),
			catchError((err) => {
				console.log('HTTP error', err.status);
				Swal.fire('Error al loguearse', 'Credenciales incorrectas!', 'error');
				throw err;
			})
		);
	}

	logoutUsuario() {
		return this.http.post(this.apiUrl + '/logout', null).subscribe((resp) => {
			this.usuario = null;
			this.token = '';
			this.menu = [];

			localStorage.removeItem('token');
			localStorage.removeItem('usuario');
			localStorage.removeItem('menu');

			this.router.navigate([ '/login' ]);

			return true;
		});
	}
}
