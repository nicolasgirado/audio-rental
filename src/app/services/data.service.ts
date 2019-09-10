import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cliente } from '../shared/models/cliente';
import { Equipo } from '../shared/models/equipo';
import { Evento } from '../shared/models/evento';
import { Lugar } from '../shared/models/lugar';
import { Salon } from '../shared/models/salon';
import { UDC } from '../shared/models/udc';
import { Usuario } from '../shared/models/usuario';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	constructor(public http: HttpClient) {}

	// Clientes

	createCliente(cliente: Cliente): Observable<Cliente> {
		return this.http.post<Cliente>('/api/clientes', cliente);
	}
	getClientes(): Observable<Cliente[]> {
		return this.http.get<Cliente[]>('/api/clientes');
	}
	getCliente(cliente: Cliente): Observable<Cliente> {
		return this.http.get<Cliente>(`/api/clientes/${cliente._id}`);
	}
	updateCliente(cliente: Cliente): Observable<any> {
		return this.http.put(`/api/clientes/${cliente._id}`, cliente, { responseType: 'text' });
	}
	deleteCliente(cliente: Cliente): Observable<any> {
		return this.http.delete(`/api/clientes/${cliente._id}`, { responseType: 'text' });
	}
	countClientes(): Observable<number> {
		return this.http.get<number>('/api/clientes/count');
	}

	// Equipos

	createEquipo(equipo: Equipo): Observable<Equipo> {
		return this.http.post<Equipo>('/api/equipos', equipo);
	}
	getEquipos(): Observable<Equipo[]> {
		return this.http.get<Equipo[]>('/api/equipos');
	}
	getEquipo(equipo: Equipo): Observable<Equipo> {
		return this.http.get<Equipo>(`/api/equipos/${equipo._id}`);
	}
	updateEquipo(equipo: Equipo): Observable<any> {
		return this.http.put(`/api/equipos/${equipo._id}`, equipo, { responseType: 'text' });
	}
	deleteEquipo(equipo: Equipo): Observable<any> {
		return this.http.delete(`/api/equipos/${equipo._id}`, { responseType: 'text' });
	}
	countEquipos(): Observable<number> {
		return this.http.get<number>('/api/equipos/count');
	}

	// Eventos

	createEvento(evento: Evento): Observable<Evento> {
		return this.http.post<Evento>('/api/eventos', evento);
	}
	getEventos(): Observable<Evento[]> {
		return this.http.get<Evento[]>('/api/eventos');
	}
	getEvento(evento: Evento): Observable<Evento> {
		return this.http.get<Evento>(`/api/eventos/${evento._id}`);
	}
	updateEvento(evento: Evento): Observable<any> {
		return this.http.put(`/api/eventos/${evento._id}`, evento, { responseType: 'text' });
	}
	deleteEvento(evento: Evento): Observable<any> {
		return this.http.delete(`/api/eventos/${evento._id}`, { responseType: 'text' });
	}
	countEventos(): Observable<number> {
		return this.http.get<number>('/api/eventos/count');
	}

	// Lugares

	createLugar(lugar: Lugar): Observable<Lugar> {
		return this.http.post<Lugar>('/api/lugares', lugar);
	}
	getLugares(): Observable<Lugar[]> {
		return this.http.get<Lugar[]>('/api/lugares');
	}
	getLugar(lugar: Lugar): Observable<Lugar> {
		return this.http.get<Lugar>(`/api/lugares/${lugar._id}`);
	}
	updateLugar(lugar: Lugar): Observable<any> {
		return this.http.put(`/api/lugares/${lugar._id}`, lugar, { responseType: 'text' });
	}
	deleteLugar(lugar: Lugar): Observable<any> {
		return this.http.delete(`/api/lugares/${lugar._id}`, { responseType: 'text' });
	}
	countLugares(): Observable<number> {
		return this.http.get<number>('/api/lugares/count');
	}

	// Salones

	createSalon(salon: Salon): Observable<Salon> {
		return this.http.post<Salon>('/api/salones', salon);
	}
	getSalones(): Observable<Salon[]> {
		return this.http.get<Salon[]>('/api/salones');
	}
	getSalonesByLugar(lugarId: string): Observable<Salon[]> {
		return this.http.get<Salon[]>(`/api/salones/lugar/${lugarId}`);
	}
	getSalon(salon: Salon): Observable<Salon> {
		return this.http.get<Salon>(`/api/salones/${salon._id}`);
	}
	updateSalon(salon: Salon): Observable<any> {
		return this.http.put(`/api/salones/${salon._id}`, salon, { responseType: 'text' });
	}
	deleteSalon(salon: Salon): Observable<any> {
		return this.http.delete(`/api/salones/${salon._id}`, { responseType: 'text' });
	}
	countSalones(): Observable<number> {
		return this.http.get<number>('/api/salones/count');
	}

	// UDCs

	createUDC(udc: UDC): Observable<UDC> {
		return this.http.post<UDC>('/api/udcs', udc);
	}
	getUDCs(): Observable<UDC[]> {
		return this.http.get<UDC[]>('/api/udcs');
	}
	getUDC(udc: UDC): Observable<UDC> {
		return this.http.get<UDC>(`/api/udcs/${udc._id}`);
	}
	updateUDC(udc: UDC): Observable<any> {
		return this.http.put(`/api/udcs/${udc._id}`, udc, { responseType: 'text' });
	}
	deleteUDC(udc: UDC): Observable<any> {
		return this.http.delete(`/api/udcs/${udc._id}`, { responseType: 'text' });
	}
	countUDCs(): Observable<number> {
		return this.http.get<number>('/api/udcs/count');
	}

	// Usuarios

	login(credenciales: any): Observable<any> {
		return this.http.post('/api/login', credenciales);
	}
	logout(usuario: Usuario): Observable<any> {
		return this.http.post('/api/logout', usuario);
	}
	logoutAll(usuario: Usuario): Observable<any> {
		return this.http.post('/api/logoutAll', usuario);
	}
	createUsuario(usuario: Usuario): Observable<Usuario> {
		return this.http.post<Usuario>('/api/usuarios', usuario);
	}
	getUsuarios(): Observable<Usuario[]> {
		return this.http.get<Usuario[]>('/api/usuarios');
	}
	getUsuario(usuario: Usuario): Observable<Usuario> {
		return this.http.get<Usuario>(`/api/usuarios/${usuario._id}`);
	}
	updateUsuario(usuario: Usuario): Observable<any> {
		return this.http.put(`/api/usuarios/${usuario._id}`, usuario, { responseType: 'text' });
	}
	deleteUsuario(usuario: Usuario): Observable<any> {
		return this.http.delete(`/api/usuarios/${usuario._id}`, { responseType: 'text' });
	}
	countUsuarios(): Observable<number> {
		return this.http.get<number>('/api/usuarios/count');
	}
}
