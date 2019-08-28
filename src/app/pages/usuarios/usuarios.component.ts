import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: [ './usuarios.component.css' ]
})
export class UsuariosComponent implements OnInit {
	totalUsuarios = 0;
	usuarios: Usuario[] = [];
	constructor(public usuarioService: UsuarioService) {}

	ngOnInit() {
		this.cargarUsuarios();
	}

	cargarUsuarios() {
		this.usuarioService.cargarUsuarios().subscribe((usuarios: any) => {
			// this.totalUsuarios = resp.total;
			this.usuarios = usuarios;
		});
	}
}
