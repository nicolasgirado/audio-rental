import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResourceService } from './resource.service';
import { EquipoPrecio } from '../shared/models/equipoPrecio';

@Injectable({
	providedIn: 'root'
})
export class EquipoPrecioService extends ResourceService<EquipoPrecio> {
	constructor(httpClient: HttpClient) {
		super(httpClient, '/api', 'equipoPrecios');
	}
}
