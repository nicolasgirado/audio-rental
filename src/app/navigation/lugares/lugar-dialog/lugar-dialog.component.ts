import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControlName, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidator } from '../../../shared/generic-validator';
import { Lugar } from '../../../shared/models/lugar';
import { SalonesComponent } from '../../salones/salones.component';

@Component({
	selector: 'app-lugar-dialog',
	templateUrl: './lugar-dialog.component.html',
	styleUrls: [ './lugar-dialog.component.scss' ]
})
export class LugarDialogComponent implements OnInit, AfterViewInit {
	lugarDialogForm: FormGroup;
	lugar: Lugar;

	displayMessage: any = {};
	private validationMessages: { [key: string]: { [key: string]: string } };
	private genericValidator: GenericValidator;

	@ViewChildren(FormControlName, { read: ElementRef })
	formInputElements: ElementRef[];

	errorMessage: string;

	constructor(
		private formbuilder: FormBuilder,
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<LugarDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.validationMessages = {
			nombre: { required: 'Campo requerido' },
			direccion: { required: 'Campo requerido' },
			email: { email: 'Email incorrecto' }
		};

		this.genericValidator = new GenericValidator(this.validationMessages);
	}

	ngOnInit(): void {
		this.lugarDialogForm = this.formbuilder.group({
			_id: [ this.data.lugar._id ],
			nombre: [ this.data.lugar.nombre, Validators.required ],
			direccion: [ this.data.lugar.direccion, Validators.required ],
			contacto: [ this.data.lugar.contacto ],
			telefonos: [ this.data.lugar.telefonos ],
			email: [ this.data.lugar.email, Validators.email ]
		});
	}

	ngAfterViewInit(): void {
		const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) =>
			fromEvent(formControl.nativeElement, 'blur')
		);

		merge(this.lugarDialogForm.valueChanges, ...controlBlurs)
			.pipe(debounceTime(800))
			.subscribe((value) => {
				this.displayMessage = this.genericValidator.processMessages(this.lugarDialogForm);
			});
	}

	openSalonesDialog() {
		let dialogRef;
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.width = '700px';
		dialogConfig.data = {
			pageTitle: `Salones de ${this.lugarDialogForm.get('nombre').value}`,
			modelName: 'salon',
			lugarId: this.data.lugar._id
		};
		dialogRef = this.dialog.open(SalonesComponent, dialogConfig);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				return;
			}
		});
	}

	save(): void {
		if (this.lugarDialogForm.invalid) {
			return;
		}
		this.dialogRef.close(this.lugarDialogForm.value);
	}

	close(): void {
		this.dialogRef.close(null);
	}
}
