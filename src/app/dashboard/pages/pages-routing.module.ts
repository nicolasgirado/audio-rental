// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EquiposComponent } from './equipos/equipos.component';
import { EventosComponent } from './eventos/eventos.component';
// Guards
import { AdminGuard } from '../../services/guards/admin.guard';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'home' },
	{ path: 'home', component: HomeComponent },
	{ path: 'usuarios', component: UsuariosComponent, canActivate: [ AdminGuard ] },
	{ path: 'equipos', component: EquiposComponent },
	{ path: 'eventos', component: EventosComponent }
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class PagesRoutingModule {}
