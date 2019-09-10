import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizarEventosComponent } from './cotizar-eventos.component';

describe('CotizarEventosComponent', () => {
	let component: CotizarEventosComponent;
	let fixture: ComponentFixture<CotizarEventosComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ CotizarEventosComponent ]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CotizarEventosComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
