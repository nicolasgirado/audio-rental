import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
	hidePassword = true;
	loginForm: FormGroup;
	email = new FormControl('', [
		Validators.required,
		Validators.email,
		Validators.minLength(3),
		Validators.maxLength(100)
	]);
	password = new FormControl('', [ Validators.required, Validators.minLength(7) ]);
	recordarme = new FormControl(false);

	constructor(public authService: AuthService, public router: Router, private formBuilder: FormBuilder) {}

	ngOnInit() {
		if (this.authService.isLoggedIn) {
			this.router.navigate([ '/' ]);
		}
		this.loginForm = this.formBuilder.group({
			email: this.email,
			password: this.password,
			recordarme: this.recordarme
		});
		const email = localStorage.getItem('email');
		if (email) {
			this.loginForm.patchValue({ email });
			this.loginForm.patchValue({ recordarme: true });
		}
	}

	login() {
		if (this.loginForm.value.recordarme) {
			localStorage.setItem('email', this.loginForm.value.email);
		} else {
			localStorage.removeItem('email');
		}
		this.authService
			.login(this.loginForm.value)
			.subscribe(
				(res) => this.router.navigate([ '/' ]),
				(error) => console.log('Invalid email or password!')
			);
	}
}
