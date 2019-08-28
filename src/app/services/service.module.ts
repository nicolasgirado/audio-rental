import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './usuario/usuario.service';
import { LoginService } from './login/login.service';
import { EquipoService } from './equipo/equipo.service';
import { EventoService } from './evento/evento.service';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
	declarations: [],
	imports: [ CommonModule, HttpClientModule ],
	providers: [ UsuarioService, LoginService, EquipoService, EventoService, AdminGuard ]
})
export class ServiceModule {}
