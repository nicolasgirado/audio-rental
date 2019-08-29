import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login/login.service';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: [ './toolbar.component.scss' ]
})
export class ToolbarComponent implements OnInit {
	@Output() toggleSidenav = new EventEmitter<void>();

	constructor(public loginService: LoginService) {}

	ngOnInit() {}
}
