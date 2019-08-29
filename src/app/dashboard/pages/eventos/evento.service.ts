import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class EventoService {
	constructor(public http: HttpClient) {}

	obtenerEventos() {
		return this.http.get(environment.apiUrl + '/eventos');
	}
}
