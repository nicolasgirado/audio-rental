// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { PagesRoutingModule } from './pages-routing.module';
// Modules
import { SharedModule } from '../../shared/shared.module';
// Components
import { PagesComponent } from './pages.component';
import { EquiposComponent } from './equipos/equipos.component';
import { EventosComponent } from './eventos/eventos.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
	declarations: [ UsuariosComponent, PagesComponent, HomeComponent, EquiposComponent, EventosComponent ],
	imports: [ CommonModule, PagesRoutingModule, SharedModule ]
})
export class PagesModule {}
