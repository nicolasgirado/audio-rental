import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResourceService } from './resource.service';
import { Equipo } from '../shared/models/equipo';

@Injectable({
	providedIn: 'root'
})
export class EquipoService extends ResourceService<Equipo> {
	constructor(httpClient: HttpClient) {
		super(httpClient, '/api', 'equipos');
	}
}
