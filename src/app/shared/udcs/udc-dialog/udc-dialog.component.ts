import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControlName, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidator } from '../../../shared/generic-validator';
import { Udc } from '../../../shared/models/udc';

@Component({
	selector: 'app-udc-dialog',
	templateUrl: './udc-dialog.component.html',
	styleUrls: [ './udc-dialog.component.scss' ]
})
export class UdcDialogComponent implements OnInit, AfterViewInit {
	udcDialogForm: FormGroup;
	udc: Udc;

	displayMessage: any = {};
	private validationMessages: { [key: string]: { [key: string]: string } };
	private genericValidator: GenericValidator;

	@ViewChildren(FormControlName, { read: ElementRef })
	formInputElements: ElementRef[];

	errorMessage: string;

	constructor(
		private formbuilder: FormBuilder,
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<UdcDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.validationMessages = {
			descripcion: { required: 'Campo requerido' }
		};

		this.genericValidator = new GenericValidator(this.validationMessages);
	}

	ngOnInit(): void {
		this.udcDialogForm = this.formbuilder.group({
			_id: [ this.data.udc._id ],
			descripcion: [ this.data.udc.descripcion, Validators.required ]
		});
	}

	ngAfterViewInit(): void {
		const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) =>
			fromEvent(formControl.nativeElement, 'blur')
		);

		merge(this.udcDialogForm.valueChanges, ...controlBlurs).pipe(debounceTime(800)).subscribe((value) => {
			this.displayMessage = this.genericValidator.processMessages(this.udcDialogForm);
		});
	}

	save(): void {
		if (this.udcDialogForm.invalid) {
			return;
		}
		this.dialogRef.close(this.udcDialogForm.value);
	}

	close(): void {
		this.dialogRef.close(null);
	}
}
