import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../shared/models/usuario';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	constructor(private httpClient: HttpClient) {}

	login(credenciales: any): Observable<any> {
		return this.httpClient.post('/api/login', credenciales);
	}

	logout(usuario: Usuario): Observable<any> {
		return this.httpClient.post('/api/logout', usuario);
	}

	logoutAll(usuario: Usuario): Observable<any> {
		return this.httpClient.post('/api/logoutAll', usuario);
	}
}
