import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
	constructor(public loginService: LoginService) {}

	ngOnInit() {}
}
