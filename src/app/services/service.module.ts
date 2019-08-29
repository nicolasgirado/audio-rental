// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// Services
import { UsuarioService } from './usuario/usuario.service';
import { LoginService } from './login/login.service';
// Guards
import { AdminGuard } from './guards/admin.guard';

@NgModule({
	declarations: [],
	imports: [ CommonModule, HttpClientModule ],
	providers: [ UsuarioService, LoginService, AdminGuard ]
})
export class ServiceModule {}
