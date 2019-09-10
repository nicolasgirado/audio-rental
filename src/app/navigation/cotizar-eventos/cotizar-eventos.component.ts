import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe, PercentPipe } from '@angular/common';

import { Evento } from '../../shared/models/evento';
import { Lugar } from '../../shared/models/lugar';
import { Salon } from '../../shared/models/salon';
import { Equipo } from '../../shared/models/equipo';
import { DataService } from '../../services/data.service';
import { MyCurrencyPipe } from '../../shared/my-currency.pipe';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-cotizar-eventos',
	templateUrl: './cotizar-eventos.component.html',
	styleUrls: [ './cotizar-eventos.component.scss' ]
})
export class CotizarEventosComponent implements OnInit, OnDestroy {
	direction = 'row';
	eventoForm: FormGroup;
	errorMessage: string;
	evento: Evento;
	lugares: Lugar[];
	salones: Salon[];
	equipos: Equipo[];
	fechaEvento: Date;
	eventoFormValueChanges$;
	adicionalesFormValueChanges$;
	totales = [
		{ label: 'Total pack', tecnica: 0, DJ: 0, comision: 0 },
		{ label: 'Total adicionales', tecnica: 0, DJ: 0, comision: 0 },
		{ label: 'Total pack + adicionales', tecnica: 0, DJ: 0, comision: 0 }
	];
	totalesDataSource = new MatTableDataSource<any>(this.totales);
	totalesDisplayedColumns = [ 'label', 'tecnica', 'DJ', 'comision' ];

	get adicionales(): FormArray {
		return this.eventoForm.get('adicionales') as FormArray;
	}

	constructor(
		private formbuilder: FormBuilder,
		private dataService: DataService,
		private datePipe: DatePipe,
		private percentPipe: PercentPipe,
		private myCurrencyPipe: MyCurrencyPipe,
		private router: Router
	) {}

	/**
	 * Form initialization
	 */
	ngOnInit(): void {
		this.getLugares();
		this.getEquipos();
		this.eventoForm = this.formbuilder.group({
			lugarId: [ null, Validators.required ],
			salon: [ null, Validators.required ],
			fechaEvento: [ null, Validators.required ],
			valorPack: [ { value: this.myCurrencyPipe.transform(0), disabled: true } ],
			totalSubtotal: [ { value: this.myCurrencyPipe.transform(0), disabled: true } ],
			totalPcioVtaDJ: [ { value: this.myCurrencyPipe.transform(0), disabled: true } ],
			adicionales: this.formbuilder.array([ this.getAdicional() ])
		});

		// Subscribe to valueChanges in eventoForm
		this.eventoFormValueChanges$ = this.eventoForm.valueChanges;
		this.eventoFormValueChanges$.subscribe((evento) => {
			// console.log(evento);
			this.updateValorPack(evento.fechaEvento, evento.salon);
			this.updateAdicionales(evento.fechaEvento, evento.lugarId, evento.adicionales);
		});
	}

	/**
	 * Unsubscribe listener
	 */
	ngOnDestroy(): void {
		this.eventoFormValueChanges$.unsubscribe();
	}

	/**
	 * Save form data
	 */
	saveEvento(): void {
		if (this.eventoForm.valid) {
			if (this.eventoForm.dirty) {
				const newEvento = { ...this.evento, ...this.eventoForm };

				if (newEvento._id === '0') {
					this.dataService
						.createEvento(newEvento)
						.subscribe(
							() => this.onSaveComplete(),
							(error: any) => (this.errorMessage = error as any)
						);
				} else {
					this.dataService
						.updateEvento(newEvento)
						.subscribe(
							() => this.onSaveComplete(),
							(error: any) => (this.errorMessage = error as any)
						);
				}
			} else {
				this.onSaveComplete();
			}
		} else {
			this.errorMessage = 'Please correct the validation errors.';
		}
	}

	onSaveComplete(): void {
		this.eventoForm.reset();
		this.router.navigate([ '/eventos' ]);
	}

	/**
	 * Create form adicional
	 */
	getAdicional(): FormGroup {
		return this.formbuilder.group({
			cantidad: [ 1, [ Validators.required, Validators.min(0) ] ],
			equipo: [ '', Validators.required ],
			observaciones: [ '', Validators.maxLength(50) ],
			pcioUnit: [ { value: this.myCurrencyPipe.transform(0), disabled: true } ],
			subtotal: [ { value: this.myCurrencyPipe.transform(0), disabled: true } ],
			pcioVtaDJ: [ { value: this.myCurrencyPipe.transform(0), disabled: true } ],
			markUp: [ { value: this.percentPipe.transform(0), disabled: true } ]
		});
	}

	/**
	 * Add new adicional row into form
	 */
	addAdicional(): void {
		const control = this.eventoForm.controls.adicionales as FormArray;
		control.push(this.getAdicional());
		// this.adicionales.push(this.getAdicional());
	}

	/**
	 * Remove adicional row from form on click delete button
	 */
	removeAdicional(i: number) {
		const control = this.eventoForm.controls.adicionales as FormArray;
		control.removeAt(i);
	}

	/**
	 * Clear all adicionales fields.
	 */
	clearAllAdicionales() {
		const control = this.eventoForm.controls.adicionales as FormArray;
		while (control.length) {
			control.removeAt(control.length - 1);
		}
		control.clearValidators();
		control.push(this.getAdicional());
	}

	/**
	 * Update valorPack as soon as something changed on evento group
	 */
	private updateValorPack(fechaEvento: any, salon: any) {
		let valorPack = 0;

		if (!fechaEvento || !salon || !salon.packs) {
			const valorPack = this.myCurrencyPipe.transform(0);
			this.eventoForm.get('valorPack').setValue(valorPack, { onlySelf: true, emitEvent: false });
		} else {
			const mesanio = this.datePipe.transform(fechaEvento._d, 'MM-yyyy');
			const dia = fechaEvento._d.getDate();
			let quincena;
			dia > 15 ? (quincena = 2) : (quincena = 1);

			const filteredPack = salon.packs.filter((pack) => {
				if (pack.mesanio === mesanio && pack.quincena === quincena) {
					return true;
				} else {
					return false;
				}
			})[0];

			if (!filteredPack) {
				this.eventoForm
					.get('valorPack')
					.setValue(this.myCurrencyPipe.transform(valorPack), { onlySelf: true, emitEvent: false });
			} else {
				valorPack = filteredPack.valorPack;
				this.eventoForm.get('valorPack').setValue(this.myCurrencyPipe.transform(valorPack), {
					onlySelf: true,
					emitEvent: false
				});

				this.totales[0].tecnica = valorPack * 0.6;
				this.totales[0].DJ = valorPack * 0.25;
				this.totales[0].comision = valorPack * 0.15;

				this.totales[2].tecnica = this.totales[0].tecnica + this.totales[1].tecnica;
				this.totales[2].DJ = this.totales[0].DJ + this.totales[1].DJ;
				this.totales[2].comision = this.totales[0].comision + this.totales[1].comision;
			}
		}
	}

	/**
	 * Update adicionales as soon as something changed on evento group
	 */
	private updateAdicionales(fechaEvento: any, lugarId: any, adicionales: any) {
		const control = this.eventoForm.controls.adicionales as FormArray;
		let totalSubtotal = 0;
		let totalPcioVtaDJ = 0;

		// tslint:disable-next-line: forin
		for (const i in adicionales) {
			let pcioUnit = 0;

			// Empieza obteniendo el pcioUnit
			if (!fechaEvento || !lugarId || !adicionales[i].equipo.precios) {
				control.at(+i).get('pcioUnit').setValue(this.myCurrencyPipe.transform(pcioUnit), {
					onlySelf: true,
					emitEvent: false
				});
			} else {
				const anio = fechaEvento._d.getFullYear();
				const mes = fechaEvento._d.getMonth();
				let semestre;
				mes > 6 ? (semestre = 2) : (semestre = 1);

				const filteredPrecio = adicionales[i].equipo.precios.filter((precio) => {
					if (precio.anio === anio && precio.semestre === semestre && precio.lugar === lugarId) {
						return true;
					} else {
						return false;
					}
				})[0];

				if (!filteredPrecio) {
					control.at(+i).get('pcioUnit').setValue(this.myCurrencyPipe.transform(pcioUnit), {
						onlySelf: true,
						emitEvent: false
					});
				} else {
					pcioUnit = filteredPrecio.precio;
					control.at(+i).get('pcioUnit').setValue(this.myCurrencyPipe.transform(pcioUnit), {
						onlySelf: true,
						emitEvent: false
					});
				}

				// Subtotal, PcioVtaDJ y Markup
				const subtotal = adicionales[i].cantidad * pcioUnit;
				control.at(+i).get('subtotal').setValue(this.myCurrencyPipe.transform(subtotal), {
					onlySelf: true,
					emitEvent: false
				});

				const pcioVtaDJ = subtotal * 1.5;
				control.at(+i).get('pcioVtaDJ').setValue(this.myCurrencyPipe.transform(pcioVtaDJ), {
					onlySelf: true,
					emitEvent: false
				});

				let markUp;
				subtotal === 0 ? (markUp = 0) : (markUp = pcioVtaDJ / subtotal - 1);
				control.at(+i).get('markUp').setValue(this.percentPipe.transform(markUp), {
					onlySelf: true,
					emitEvent: false
				});

				// Total subtotal y total pcioVtaDJ
				totalSubtotal += subtotal;
				this.eventoForm.get('totalSubtotal').setValue(this.myCurrencyPipe.transform(totalSubtotal), {
					onlySelf: true,
					emitEvent: false
				});

				totalPcioVtaDJ += pcioVtaDJ;
				this.eventoForm
					.get('totalPcioVtaDJ')
					.setValue(this.myCurrencyPipe.transform(totalPcioVtaDJ), {
						onlySelf: true,
						emitEvent: false
					});

				// Tabla de totales
				this.totales[1].tecnica = totalSubtotal;
				this.totales[1].DJ = (totalPcioVtaDJ - totalSubtotal) * 0.606;
				this.totales[1].comision = (totalPcioVtaDJ - totalSubtotal) * 0.394;

				this.totales[2].tecnica = this.totales[0].tecnica + this.totales[1].tecnica;
				this.totales[2].DJ = this.totales[0].DJ + this.totales[1].DJ;
				this.totales[2].comision = this.totales[0].comision + this.totales[1].comision;
			}
		}
	}

	/**
	 * Get data from dataService: Lugares, Salones By Lugar, Equipos
	 */
	getLugares(): void {
		this.dataService
			.getLugares()
			.subscribe(
				(lugares: Lugar[]) => (this.lugares = lugares),
				(error: any) => (this.errorMessage = error as any)
			);
	}

	getSalonesByLugar(): void {
		this.dataService
			.getSalonesByLugar(this.eventoForm.get('lugarId').value)
			.subscribe(
				(salones: any) => (this.salones = salones),
				(error: any) => (this.errorMessage = error as any)
			);
	}

	getEquipos(): void {
		this.dataService
			.getEquipos()
			.subscribe(
				(equipos: Equipo[]) => (this.equipos = equipos),
				(error: any) => (this.errorMessage = error as any)
			);
	}
}
