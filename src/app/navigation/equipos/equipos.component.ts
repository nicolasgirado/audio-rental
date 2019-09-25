import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Equipo } from '../../shared/models/equipo';
import { EquipoService } from '../../services/equipo.service';
import { EquipoDialogComponent } from './equipo-dialog/equipo-dialog.component';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';

@Component({
	selector: 'app-equipos',
	templateUrl: './equipos.component.html',
	styleUrls: [ './equipos.component.scss' ]
})
export class EquiposComponent implements OnInit {
	pageTitle = 'Equipos';
	modelName = 'equipo';
	columnHeader = { descripcion: 'Descripción', rubroDesc: 'Rubro' };
	tableData: Equipo[];

	constructor(public equipoService: EquipoService, public dialog: MatDialog) {}

	ngOnInit() {
		this.loadEquipos();
	}

	loadEquipos() {
		this.equipoService.readAll().subscribe((equipos: any[]) => {
			equipos.forEach((equipo: any) => {
				equipo.rubroDesc = equipo.rubro.descripcion;
			});
			this.tableData = equipos;
		});
	}

	openDialog(event) {
		let dialogRef;
		const action = event.action;
		const equipo = event.obj;
		const dialogConfig = new MatDialogConfig();

		dialogConfig.autoFocus = true;
		dialogConfig.width = '500px';

		if (action === 'Create') {
			dialogConfig.data = {
				title: `Nuevo equipo`,
				action,
				equipo
			};
			dialogRef = this.dialog.open(EquipoDialogComponent, dialogConfig);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.equipoService.create(result).subscribe(() => this.loadEquipos());
				}
			});
		} else if (action === 'Update') {
			dialogConfig.data = {
				title: `Editar el equipo  ${equipo.nombre}`,
				action,
				equipo
			};
			dialogRef = this.dialog.open(EquipoDialogComponent, dialogConfig);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.equipoService.update(result).subscribe(() => this.loadEquipos());
				}
			});
		} else if (action === 'Delete') {
			dialogConfig.data = {
				title: `Eliminar el equipo  ${equipo.descripcion}`,
				message: '¿Estás seguro?'
			};
			dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.equipoService.delete(equipo._id).subscribe(() => this.loadEquipos());
				}
			});
		}
	}
}
