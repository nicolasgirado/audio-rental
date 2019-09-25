import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControlName, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidator } from '../../../shared/generic-validator';
import { Usuario } from '../../../shared/models/usuario';

@Component({
	selector: 'app-usuario-dialog',
	templateUrl: './usuario-dialog.component.html',
	styleUrls: [ './usuario-dialog.component.scss' ]
})
export class UsuarioDialogComponent implements OnInit, AfterViewInit {
	hidePassword = true;
	usuarioDialogForm: FormGroup;
	usuario: Usuario;
	roles = [ 'ADMIN', 'NIVEL1', 'NIVEL2' ];

	displayMessage: any = {};
	private validationMessages: { [key: string]: { [key: string]: string } };
	private genericValidator: GenericValidator;

	@ViewChildren(FormControlName, { read: ElementRef })
	formInputElements: ElementRef[];

	errorMessage: string;

	constructor(
		private formbuilder: FormBuilder,
		public dialogRef: MatDialogRef<UsuarioDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.validationMessages = {
			nombre: { required: 'Campo requerido' },
			email: { required: 'Campo requerido', email: 'Email incorrecto' },
			password: { required: 'Campo requerido', minlength: 'Mínimo 7 caracteres' },
			role: { required: 'Campo requerido' }
		};

		this.genericValidator = new GenericValidator(this.validationMessages);
	}

	ngOnInit(): void {
		this.usuarioDialogForm = this.formbuilder.group({
			_id: [ this.data.usuario._id ],
			nombre: [ this.data.usuario.nombre, Validators.required ],
			email: [ this.data.usuario.email, [ Validators.required, Validators.email ] ],
			role: [ this.data.usuario.role, Validators.required ]
		});

		if (this.data.action === 'Create') {
			this.usuarioDialogForm.addControl(
				'password',
				new FormControl('', [ Validators.required, Validators.minLength(7) ])
			);
		}
	}

	ngAfterViewInit(): void {
		const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) =>
			fromEvent(formControl.nativeElement, 'blur')
		);

		merge(this.usuarioDialogForm.valueChanges, ...controlBlurs)
			.pipe(debounceTime(800))
			.subscribe((value) => {
				this.displayMessage = this.genericValidator.processMessages(this.usuarioDialogForm);
			});
	}

	save(): void {
		if (this.usuarioDialogForm.invalid) {
			return;
		}
		this.dialogRef.close(this.usuarioDialogForm.value);
	}

	close(): void {
		this.dialogRef.close(null);
	}
}
