import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResourceService } from './resource.service';
import { Evento } from '../shared/models/evento';

@Injectable({
	providedIn: 'root'
})
export class EventoService extends ResourceService<Evento> {
	constructor(httpClient: HttpClient) {
		super(httpClient, '/api', 'eventos');
	}
}
