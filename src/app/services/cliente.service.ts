import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResourceService } from './resource.service';
import { Cliente } from '../shared/models/cliente';

@Injectable({
	providedIn: 'root'
})
export class ClienteService extends ResourceService<Cliente> {
	constructor(httpClient: HttpClient) {
		super(httpClient, '/api', 'clientes');
	}
}
