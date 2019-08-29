import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {
	constructor(public http: HttpClient) {}

	obtenerUsuarios() {
		return this.http.get(environment.apiUrl + '/usuarios');
	}
}
