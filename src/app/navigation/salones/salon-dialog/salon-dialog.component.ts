import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControlName } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidator } from '../../../shared/generic-validator';
import { Salon } from '../../../shared/models/salon';

@Component({
	selector: 'app-salon-dialog',
	templateUrl: './salon-dialog.component.html',
	styleUrls: [ './salon-dialog.component.scss' ]
})
export class SalonDialogComponent implements OnInit, AfterViewInit {
	salonDialogForm: FormGroup;
	salon: Salon;

	displayMessage: any = {};
	private validationMessages: { [key: string]: { [key: string]: string } };
	private genericValidator: GenericValidator;

	@ViewChildren(FormControlName, { read: ElementRef })
	formInputElements: ElementRef[];

	errorMessage: string;

	constructor(
		private formbuilder: FormBuilder,
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<SalonDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.validationMessages = {
			nombre: { required: 'Campo requerido' }
		};

		this.genericValidator = new GenericValidator(this.validationMessages);
	}

	ngOnInit(): void {
		this.salonDialogForm = this.formbuilder.group({
			_id: [ this.data.salon._id ],
			nombre: [ this.data.salon.nombre, Validators.required ]
		});
	}

	ngAfterViewInit(): void {
		const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) =>
			fromEvent(formControl.nativeElement, 'blur')
		);

		merge(this.salonDialogForm.valueChanges, ...controlBlurs)
			.pipe(debounceTime(800))
			.subscribe((value) => {
				this.displayMessage = this.genericValidator.processMessages(this.salonDialogForm);
			});
	}

	save(): void {
		if (this.salonDialogForm.invalid) {
			return;
		}
		this.dialogRef.close(this.salonDialogForm.value);
	}

	close(): void {
		this.dialogRef.close(null);
	}
}
