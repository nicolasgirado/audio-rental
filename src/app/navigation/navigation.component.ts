import { Component, OnInit, ChangeDetectorRef, ViewChild, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthService } from '../services/auth.service';
import { Usuario } from '../shared/models/usuario';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: [ './navigation.component.scss' ]
})
export class NavigationComponent implements OnInit, OnDestroy {
	navList: any[] = [];
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;

	constructor(
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher,
		private router: Router,
		public authService: AuthService
	) {
		this.mobileQuery = media.matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	@Input() toggleSidenav: Event;
	@ViewChild(MatSidenav, { static: false })
	sidenav: MatSidenav;

	ngOnInit() {
		this.setNavList(this.authService.currentUsuario);
		this.router.events.subscribe(() => {
			if (this.mobileQuery.matches) {
				this.sidenav.close();
			}
		});
		if (this.toggleSidenav) {
			console.log('holaa');
		}
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}

	setNavList(usuario: Usuario) {
		this.navList = [
			{
				title: 'Home',
				icon: 'home',
				url: '/home'
			},
			{
				title: 'Eventos',
				icon: 'event',
				subNavList: [
					{
						title: 'Cotizar evento',
						icon: 'attach_money',
						url: '/cotizar-eventos'
					},
					{
						title: 'Ver eventos',
						icon: 'event_note',
						url: '/eventos'
					}
				]
			},
			{
				title: 'Lugares',
				icon: 'room',
				url: '/lugares'
			},
			{
				title: 'Equipos',
				icon: 'speaker',
				url: '/equipos'
			}
		];

		if (usuario.role === 'ADMIN') {
			this.navList.push({
				title: 'Admin',
				icon: 'lock',
				subNavList: [
					{
						title: 'Usuarios',
						icon: 'supervised_user_circle',
						url: '/usuarios'
					}
				]
			});
		}
	}
}
