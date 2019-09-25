import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Udc } from '../../shared/models/udc';
import { UdcService } from '../../services/udc.service';
import { UdcDialogComponent } from './udc-dialog/udc-dialog.component';
import { DialogBoxComponent } from '../../shared/dialog-box/dialog-box.component';

@Component({
	selector: 'app-udcs',
	templateUrl: './udcs.component.html',
	styleUrls: [ './udcs.component.scss' ]
})
export class UdcsComponent implements OnInit {
	columnHeader = { descripcion: 'Descripción' };
	tableData: Udc[];

	constructor(
		public udcService: UdcService,
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<UdcsComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit() {
		this.loadUdcs();
	}

	loadUdcs() {
		this.udcService.readAll().subscribe((udcs: any[]) => {
			this.tableData = udcs.filter((udc) => udc.categoria === this.data.pageTitle);
		});
	}

	openDialog(event) {
		let dialogRef;
		const action = event.action;
		const udc = event.obj;
		const dialogConfig = new MatDialogConfig();

		dialogConfig.autoFocus = true;
		dialogConfig.width = '500px';

		if (action === 'Create') {
			dialogConfig.data = {
				title: `Nuevo ${this.data.modelName}`,
				action,
				udc
			};
			dialogRef = this.dialog.open(UdcDialogComponent, dialogConfig);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.udcService
						.create({ ...result, categoria: this.data.pageTitle })
						.subscribe(() => this.loadUdcs());
				}
			});
		} else if (action === 'Update') {
			dialogConfig.data = {
				title: `Editar el ${this.data.modelName} ${udc.descripcion}`,
				action,
				udc
			};
			dialogRef = this.dialog.open(UdcDialogComponent, dialogConfig);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.udcService.update(result).subscribe(() => this.loadUdcs());
				}
			});
		} else if (action === 'Delete') {
			dialogConfig.data = {
				title: `Eliminar el ${this.data.modelName} ${udc.descripcion}`,
				message: '¿Estás seguro?'
			};
			dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

			dialogRef.afterClosed().subscribe((result) => {
				if (result) {
					this.udcService.delete(udc._id).subscribe(() => this.loadUdcs());
				}
			});
		}
	}
}
