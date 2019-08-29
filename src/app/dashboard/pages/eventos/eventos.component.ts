import { Component, OnInit, ViewChild } from '@angular/core';
import { Evento } from './evento.model';
import { EventoService } from './evento.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
	selector: 'app-eventos',
	templateUrl: './eventos.component.html',
	styleUrls: [ './eventos.component.scss' ]
})
export class EventosComponent implements OnInit {
	displayedColumns = [ 'lugar', 'salon', 'fechaEvento', 'precioPack' ];
	dataSource: MatTableDataSource<Evento>;
	loading = true;

	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;
	@ViewChild(MatSort, { static: true })
	sort: MatSort;

	constructor(public eventoService: EventoService) {}

	ngOnInit() {
		this.eventoService.obtenerEventos().subscribe((eventos: any) => {
			this.dataSource = new MatTableDataSource<Evento>(eventos);
		});
		setTimeout(() => (this.dataSource.paginator = this.paginator));
		setTimeout(() => (this.dataSource.sort = this.sort));
		this.loading = false;
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
