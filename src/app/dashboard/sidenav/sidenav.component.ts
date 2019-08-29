import { Component, OnInit, ChangeDetectorRef, ViewChild, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { LoginService } from '../../services/login/login.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: [ './sidenav.component.scss' ]
})
export class SidenavComponent implements OnInit, OnDestroy {
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;

	constructor(
		public loginService: LoginService,
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher,
		private router: Router
	) {
		this.mobileQuery = media.matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	@Input() toggleSidenav: Event;
	@ViewChild(MatSidenav, { static: false })
	sidenav: MatSidenav;

	ngOnInit() {
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
}
