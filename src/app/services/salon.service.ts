import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResourceService } from './resource.service';
import { Salon } from '../shared/models/salon';

@Injectable({
	providedIn: 'root'
})
export class SalonService extends ResourceService<Salon> {
	constructor(httpClient: HttpClient) {
		super(httpClient, '/api', 'salones');
	}
}
