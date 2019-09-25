import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EquiposComponent } from './equipos/equipos.component';
import { LugaresComponent } from './lugares/lugares.component';
// import { UdcsComponent } from '../shared/udcs/udcs.component';

import { AuthAdminGuard } from '../services/auth-admin.guard';
import { AuthLoginGuard } from '../services/auth-login.guard';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'home' },
	{ path: 'home', component: HomeComponent, canActivate: [ AuthLoginGuard ] },
	{ path: 'usuarios', component: UsuariosComponent, canActivate: [ AuthLoginGuard, AuthAdminGuard ] },
	{ path: 'equipos', component: EquiposComponent, canActivate: [ AuthLoginGuard ] },
	{ path: 'lugares', component: LugaresComponent, canActivate: [ AuthLoginGuard ] }
	// { path: 'udcs', component: UdcsComponent, canActivate: [ AuthLoginGuard, AuthAdminGuard ] }
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class NavigationRoutingModule {}
