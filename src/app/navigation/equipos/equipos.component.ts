import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Equipo } from '../../shared/models/equipo';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-equipos',
	templateUrl: './equipos.component.html',
	styleUrls: [ './equipos.component.scss' ]
})
export class EquiposComponent implements OnInit {
	displayedColumns = [ 'position', 'descripcion', 'rubro' ];
	dataSource: MatTableDataSource<Equipo>;
	loading = true;

	@ViewChild(MatPaginator, { static: false })
	paginator: MatPaginator;
	@ViewChild(MatSort, { static: false })
	sort: MatSort;

	constructor(public dataService: DataService) {}

	ngOnInit() {
		this.dataService.getEquipos().subscribe((equipos: any) => {
			this.dataSource = new MatTableDataSource<Equipo>(equipos);
		});
		// setTimeout(() => (this.dataSource.paginator = this.paginator));
		// setTimeout(() => (this.dataSource.sort = this.sort));
		this.loading = false;
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
