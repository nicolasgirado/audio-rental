import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Evento } from '../../shared/models/evento';
import { DataService } from '../../services/data.service';

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

	constructor(public dataService: DataService) {}

	ngOnInit() {
		this.dataService.getEventos().subscribe((eventos: any) => {
			this.dataSource = new MatTableDataSource<Evento>(eventos);
		});
		// setTimeout(() => (this.dataSource.paginator = this.paginator));
		// setTimeout(() => (this.dataSource.sort = this.sort));
		this.loading = false;
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
