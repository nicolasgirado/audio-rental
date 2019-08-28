import { Component, OnInit } from '@angular/core';
import { Evento } from '../../models/evento.model';
import { EventoService } from '../../services/evento/evento.service';

@Component({
	selector: 'app-eventos',
	templateUrl: './eventos.component.html',
	styleUrls: [ './eventos.component.css' ]
})
export class EventosComponent implements OnInit {
	totalEventos = 0;
	eventos: Evento[] = [];

	constructor(public eventoService: EventoService) {}

	ngOnInit() {
		this.cargarEventos();
	}

	cargarEventos() {
		this.eventoService.cargarEventos().subscribe((eventos: any) => {
			this.eventos = eventos;
		});
	}
}
