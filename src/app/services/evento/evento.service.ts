import { Injectable } from '@angular/core';
import { Evento } from '../../models/evento.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class EventoService {
	apiUrl = environment.apiUrl;
	evento: Evento;

	constructor(public http: HttpClient) {}

	cargarEventos() {
		return this.http.get(this.apiUrl + '/eventos');
	}
}
