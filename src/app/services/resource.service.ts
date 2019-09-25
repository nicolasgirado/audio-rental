import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Resource } from '../shared/models/resource';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class ResourceService<T extends Resource> {
	constructor(private httpClient: HttpClient, private url: string, private endpoint: string) {}

	create(item: T): Observable<T> {
		item._id = null;
		return this.httpClient.post<T>(`${this.url}/${this.endpoint}`, item, httpOptions);
	}

	update(item: T): Observable<any> {
		return this.httpClient.put<any>(`${this.url}/${this.endpoint}/${item._id}`, item, httpOptions);
	}

	read(id: string): Observable<T> {
		return this.httpClient.get<T>(`${this.url}/${this.endpoint}/${id}`, httpOptions);
	}

	readAll(): Observable<T[]> {
		return this.httpClient.get<T[]>(`${this.url}/${this.endpoint}`, httpOptions);
	}

	delete(id: string) {
		return this.httpClient.delete(`${this.url}/${this.endpoint}/${id}`, httpOptions);
	}
}
