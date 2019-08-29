import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipo } from './equipo.model';
import { EquipoService } from './equipo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-equipos',
	templateUrl: './equipos.component.html',
	styleUrls: [ './equipos.component.scss' ]
})
export class EquiposComponent implements OnInit {
	displayedColumns = [ 'position', 'nombre', 'rubro' ];
	dataSource: MatTableDataSource<Equipo>;
	loading = true;

	@ViewChild(MatPaginator, { static: false })
	paginator: MatPaginator;
	@ViewChild(MatSort, { static: false })
	sort: MatSort;

	constructor(public equipoService: EquipoService) {}

	ngOnInit() {
		this.equipoService.obtenerEquipos().subscribe((equipos: any) => {
			this.dataSource = new MatTableDataSource<Equipo>(equipos);
		});
		setTimeout(() => (this.dataSource.paginator = this.paginator));
		setTimeout(() => (this.dataSource.sort = this.sort));
		this.loading = false;
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
