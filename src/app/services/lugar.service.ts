import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResourceService } from './resource.service';
import { Lugar } from '../shared/models/lugar';

@Injectable({
	providedIn: 'root'
})
export class LugarService extends ResourceService<Lugar> {
	constructor(httpClient: HttpClient) {
		super(httpClient, '/api', 'lugares');
	}
}
