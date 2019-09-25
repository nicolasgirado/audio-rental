import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Salon } from '../../shared/models/salon';
import { SalonService } from '../../services/salon.service';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';
import { SalonDialogComponent } from '../salones/salon-dialog/salon-dialog.component';

@Component({
	selector: 'app-salones',
	templateUrl: './salones.component.html',
	styleUrls: [ './salones.component.scss' ]
})
export class SalonesComponent implements OnInit {
	pageTitle = 'Salones';
	modelName = 'salon';
	columnHeader = {
		nombre: 'Nombre'
	};
	tableData: Salon[];

	constructor(
		public salonService: SalonService,
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<SalonesComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit() {
		this.loadSalones();
	}

	loadSalones() {
		this.salonService.readAll().subscribe((salones: any) => {
			this.tableData = salones.filter((salon) => salon.lugar._id === this.data.lugarId);
		});
	}

	openDialog(event) {
		let dialogRef;
		const action = event.action;
		const salon = event.obj;
		const dialogConfig = new MatDialogConfig();

		dialogConfig.autoFocus = true;
		dialogConfig.width = '500px';

		if (action === 'Create') {
			dialogConfig.data = {
				title: `Nuevo salon`,
				action,
				salon
			};
			dialogRef = this.dialog.open(SalonDialogComponent, dialogConfig);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.salonService
						.create({ ...result, lugar: this.data.lugarId })
						.subscribe(() => this.loadSalones());
				}
			});
		} else if (action === 'Update') {
			dialogConfig.data = {
				title: `Editar el salon  ${salon.nombre}`,
				action,
				salon
			};
			dialogRef = this.dialog.open(SalonDialogComponent, dialogConfig);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.salonService.update(result).subscribe(() => this.loadSalones());
				}
			});
		} else if (action === 'Delete') {
			dialogConfig.data = {
				title: `Eliminar el salon  ${salon.nombre}`,
				message: '¿Estás seguro?'
			};
			dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.salonService.delete(salon._id).subscribe(() => this.loadSalones());
				}
			});
		}
	}
}
