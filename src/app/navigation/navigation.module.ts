// Angular
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, PercentPipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
// Modules
import { NavigationRoutingModule } from './navigation-routing.module';
import { SharedModule } from '../shared/shared.module';
// Components
import { NavigationComponent } from './navigation.component';
import { HomeComponent } from './home/home.component';
import { EquiposComponent } from './equipos/equipos.component';
import { EventosComponent } from './eventos/eventos.component';
import { CotizarEventosComponent } from './cotizar-eventos/cotizar-eventos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
// Pipes
import { MyCurrencyPipe } from '../shared/my-currency.pipe';
// MatDatePicker
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_FORMATS = {
	parse: {
		dateInput: 'DD/MM/YYYY'
	},
	display: {
		dateInput: 'DD/MM/YYYY',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY'
	}
};

@NgModule({
	declarations: [
		NavigationComponent,
		HomeComponent,
		EquiposComponent,
		EventosComponent,
		CotizarEventosComponent,
		UsuariosComponent
	],
	imports: [ CommonModule, ReactiveFormsModule, FlexLayoutModule, NavigationRoutingModule, SharedModule ],
	providers: [
		DatePipe,
		PercentPipe,
		MyCurrencyPipe,
		// MatDatePicker
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [ MAT_DATE_LOCALE ] },
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
	]
})
export class NavigationModule {}
