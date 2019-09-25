import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResourceService } from './resource.service';
import { Udc } from '../shared/models/udc';

@Injectable({
	providedIn: 'root'
})
export class UdcService extends ResourceService<Udc> {
	constructor(httpClient: HttpClient) {
		super(httpClient, '/api', 'udcs');
	}
}
