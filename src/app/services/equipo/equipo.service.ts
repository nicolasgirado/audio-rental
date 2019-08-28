import { Injectable } from '@angular/core';
import { Equipo } from '../../models/equipo.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class EquipoService {
	apiUrl = environment.apiUrl;
	equipo: Equipo;

	constructor(public http: HttpClient) {}

	cargarEquipos() {
		return this.http.get(this.apiUrl + '/equipos');
	}
}
