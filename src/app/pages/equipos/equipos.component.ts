import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../models/equipo.model';
import { EquipoService } from '../../services/equipo/equipo.service';

@Component({
	selector: 'app-equipos',
	templateUrl: './equipos.component.html',
	styleUrls: [ './equipos.component.css' ]
})
export class EquiposComponent implements OnInit {
	totalEquipos = 0;
	equipos: Equipo[] = [];

	constructor(public equipoService: EquipoService) {}

	ngOnInit() {
		this.cargarEquipos();
	}

	cargarEquipos() {
		this.equipoService.cargarEquipos().subscribe((equipos: any) => {
			// this.totalUsuarios = resp.total;
			this.equipos = equipos;
		});
	}
}
