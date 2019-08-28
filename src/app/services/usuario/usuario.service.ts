import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../models/usuario.model';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {
	apiUrl = environment.apiUrl;
	usuario: Usuario;
	constructor(public http: HttpClient) {}

	cargarUsuarios() {
		return this.http.get(this.apiUrl + '/usuarios');
	}
}
