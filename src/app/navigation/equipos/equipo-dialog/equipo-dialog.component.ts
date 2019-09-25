import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControlName, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidator } from '../../../shared/generic-validator';
import { Equipo } from '../../../shared/models/equipo';
import { Udc } from '../../../shared/models/udc';
import { UdcService } from '../../../services/udc.service';
import { UdcsComponent } from '../../../shared/udcs/udcs.component';

@Component({
	selector: 'app-equipo-dialog',
	templateUrl: './equipo-dialog.component.html',
	styleUrls: [ './equipo-dialog.component.scss' ]
})
export class EquipoDialogComponent implements OnInit, AfterViewInit {
	equipoDialogForm: FormGroup;
	equipo: Equipo;
	rubros: Udc[];

	displayMessage: any = {};
	private validationMessages: { [key: string]: { [key: string]: string } };
	private genericValidator: GenericValidator;

	@ViewChildren(FormControlName, { read: ElementRef })
	formInputElements: ElementRef[];

	errorMessage: string;

	constructor(
		private udcService: UdcService,
		private formbuilder: FormBuilder,
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<EquipoDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.validationMessages = {
			descripcion: { required: 'Campo requerido' },
			rubro: { required: 'Campo requerido' }
		};

		this.genericValidator = new GenericValidator(this.validationMessages);
	}

	ngOnInit(): void {
		this.equipoDialogForm = this.formbuilder.group({
			_id: [ this.data.equipo._id ],
			descripcion: [ this.data.equipo.descripcion, Validators.required ],
			rubro: [ '', Validators.required ]
		});

		if (this.data.action === 'Update') {
			this.equipoDialogForm.get('rubro').setValue(this.data.equipo.rubro._id);
		}

		this.loadRubros();
	}

	ngAfterViewInit(): void {
		const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) =>
			fromEvent(formControl.nativeElement, 'blur')
		);

		merge(this.equipoDialogForm.valueChanges, ...controlBlurs)
			.pipe(debounceTime(800))
			.subscribe((value) => {
				this.displayMessage = this.genericValidator.processMessages(this.equipoDialogForm);
			});
	}

	loadRubros() {
		this.udcService.readAll().subscribe((udcs) => {
			this.rubros = udcs.filter((udc) => udc.categoria === 'Rubros');
		});
	}

	openUdcsDialog() {
		let dialogRef;
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.width = '700px';
		dialogConfig.data = {
			pageTitle: 'Rubros',
			modelName: 'rubro'
		};
		dialogRef = this.dialog.open(UdcsComponent, dialogConfig);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				return;
			}
		});
	}

	save(): void {
		if (this.equipoDialogForm.invalid) {
			return;
		}
		this.dialogRef.close(this.equipoDialogForm.value);
	}

	close(): void {
		this.dialogRef.close(null);
	}
}
