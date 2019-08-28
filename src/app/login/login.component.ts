import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { FormControl, Validators, NgForm } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	email = '';
	recuerdame = false;

	constructor(public loginService: LoginService, public router: Router) {}

	ngOnInit() {
		this.email = localStorage.getItem('email') || '';
		if (this.email.length > 1) {
			this.recuerdame = true;
		}
	}

	ingresar(f: NgForm) {
		if (f.invalid) {
			return;
		}
		const usuario = new Usuario(null, f.value.email, f.value.password);
		this.loginService
			.loginUsuario(usuario, true)
			.subscribe((resp) => this.router.navigate([ '/dashboard' ]));
	}
}
