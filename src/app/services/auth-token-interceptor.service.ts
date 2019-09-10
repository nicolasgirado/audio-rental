import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthTokenInterceptorService implements HttpInterceptor {
	constructor(public authService: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const headers = new HttpHeaders({
			Authorization: 'Bearer ' + this.authService.currentToken
		});
		const reqClone = req.clone({
			headers
		});

		return next.handle(reqClone);
	}
}
