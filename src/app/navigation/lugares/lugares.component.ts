import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Lugar } from '../../shared/models/lugar';
import { LugarService } from '../../services/lugar.service';
import { LugarDialogComponent } from './lugar-dialog/lugar-dialog.component';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';

@Component({
	selector: 'app-lugares',
	templateUrl: './lugares.component.html',
	styleUrls: [ './lugares.component.scss' ]
})
export class LugaresComponent implements OnInit {
	pageTitle = 'Lugares';
	modelName = 'lugar';
	columnHeader = {
		nombre: 'Nombre',
		direccion: 'Dirección',
		contacto: 'Contacto',
		telefonos: 'Teléfonos',
		email: 'Correo electrónico'
	};
	tableData: Lugar[];

	constructor(public lugarService: LugarService, public dialog: MatDialog) {}

	ngOnInit() {
		this.loadLugares();
	}

	loadLugares() {
		this.lugarService.readAll().subscribe((lugares: any) => {
			this.tableData = lugares;
		});
	}

	openDialog(event) {
		let dialogRef;
		const action = event.action;
		const lugar = event.obj;
		const dialogConfig = new MatDialogConfig();

		dialogConfig.autoFocus = true;
		dialogConfig.width = '500px';

		if (action === 'Create') {
			dialogConfig.data = {
				title: `Nuevo lugar`,
				action,
				lugar
			};
			dialogRef = this.dialog.open(LugarDialogComponent, dialogConfig);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.lugarService.create(result).subscribe(() => this.loadLugares());

					// // Dialogo agregar salones? (no logro obtener el id del lugar creado recientemente)
					// // Debería crearse apenas se guarda el mongoose model pero vuelve como null
				}
			});
		} else if (action === 'Update') {
			dialogConfig.data = {
				title: `Editar el lugar  ${lugar.nombre}`,
				action,
				lugar
			};
			dialogRef = this.dialog.open(LugarDialogComponent, dialogConfig);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.lugarService.update(result).subscribe(() => this.loadLugares());
				}
			});
		} else if (action === 'Delete') {
			dialogConfig.data = {
				title: `Eliminar el lugar  ${lugar.nombre}`,
				message: '¿Estás seguro?'
			};
			dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.lugarService.delete(lugar._id).subscribe(() => this.loadLugares());
				}
			});
		}
	}
}
