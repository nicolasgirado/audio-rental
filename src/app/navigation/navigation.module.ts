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
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioDialogComponent } from './usuarios/usuario-dialog/usuario-dialog.component';
import { EquiposComponent } from './equipos/equipos.component';
import { EquipoDialogComponent } from './equipos/equipo-dialog/equipo-dialog.component';
import { LugaresComponent } from './lugares/lugares.component';
import { LugarDialogComponent } from './lugares/lugar-dialog/lugar-dialog.component';
import { SalonesComponent } from './salones/salones.component';
import { SalonDialogComponent } from './salones/salon-dialog/salon-dialog.component';
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
		UsuariosComponent,
		UsuarioDialogComponent,
		EquiposComponent,
		EquipoDialogComponent,
		LugaresComponent,
		LugarDialogComponent,
		SalonesComponent,
		SalonDialogComponent
	],
	imports: [ CommonModule, ReactiveFormsModule, FlexLayoutModule, NavigationRoutingModule, SharedModule ],
	entryComponents: [
		UsuarioDialogComponent,
		EquipoDialogComponent,
		LugarDialogComponent,
		SalonesComponent,
		SalonDialogComponent
	],
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
