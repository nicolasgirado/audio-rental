import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginService } from '../login/login.service';

@Injectable({
	providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
	constructor(public loginService: LoginService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const headers = new HttpHeaders({
			Authorization: 'Bearer ' + this.loginService.token
		});
		const reqClone = req.clone({
			headers
		});

		return next.handle(reqClone);
	}
}
