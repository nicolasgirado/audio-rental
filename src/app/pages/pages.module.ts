import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';

// Routing
import { PagesRoutingModule } from './pages-routing.module';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EquiposComponent } from './equipos/equipos.component';
import { EventosComponent } from './eventos/eventos.component';

@NgModule({
	declarations: [ UsuariosComponent, PagesComponent, DashboardComponent, EquiposComponent, EventosComponent ],
	imports: [ CommonModule, PagesRoutingModule, SharedModule ]
})
export class PagesModule {}
