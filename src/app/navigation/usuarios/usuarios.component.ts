import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Usuario } from '../../shared/models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioDialogComponent } from './usuario-dialog/usuario-dialog.component';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: [ './usuarios.component.scss' ]
})
export class UsuariosComponent implements OnInit {
	pageTitle = 'Usuarios';
	modelName = 'usuario';
	columnHeader = { nombre: 'Nombre', email: 'Correo electrónico', role: 'Role' };
	tableData: Usuario[];

	constructor(public usuarioService: UsuarioService, public dialog: MatDialog) {}

	ngOnInit() {
		this.loadUsuarios();
	}

	loadUsuarios() {
		this.usuarioService.readAll().subscribe((usuarios: any) => {
			this.tableData = usuarios;
		});
	}

	openDialog(event) {
		let dialogRef;
		const action = event.action;
		const usuario = event.obj;
		const dialogConfig = new MatDialogConfig();

		dialogConfig.autoFocus = true;
		dialogConfig.width = '500px';

		if (action === 'Create') {
			dialogConfig.data = {
				title: `Nuevo usuario`,
				action,
				usuario
			};
			dialogRef = this.dialog.open(UsuarioDialogComponent, dialogConfig);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.usuarioService.create(result).subscribe(() => this.loadUsuarios());
				}
			});
		} else if (action === 'Update') {
			dialogConfig.data = {
				title: `Editar el usuario  ${usuario.nombre}`,
				action,
				usuario
			};
			dialogRef = this.dialog.open(UsuarioDialogComponent, dialogConfig);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.usuarioService.update(result).subscribe(() => this.loadUsuarios());
				}
			});
		} else if (action === 'Delete') {
			dialogConfig.data = {
				title: `Eliminar el usuario  ${usuario.nombre}`,
				message: '¿Estás seguro?'
			};
			dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.usuarioService.delete(usuario._id).subscribe(() => this.loadUsuarios());
				}
			});
		}
	}
}
