import { Injectable } from '@angular/core';
import { Equipo } from './equipo.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class EquipoService {
	constructor(public http: HttpClient) {}

	obtenerEquipos(): Observable<Equipo> {
		return this.http.get<Equipo>(environment.apiUrl + '/equipos');
	}
}
