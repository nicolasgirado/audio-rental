import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResourceService } from './resource.service';
import { Usuario } from '../shared/models/usuario';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService extends ResourceService<Usuario> {
	constructor(httpClient: HttpClient) {
		super(httpClient, '/api', 'usuarios');
	}
}
