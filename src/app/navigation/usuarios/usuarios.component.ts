import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Usuario } from '../../shared/models/usuario';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: [ './usuarios.component.scss' ]
})
export class UsuariosComponent implements OnInit {
	displayedColumns = [ 'position', 'nombre', 'email', 'role' ];
	dataSource: MatTableDataSource<Usuario>;
	loading = true;

	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;
	@ViewChild(MatSort, { static: true })
	sort: MatSort;

	constructor(public dataService: DataService) {}

	ngOnInit() {
		this.dataService.getUsuarios().subscribe((usuarios: any) => {
			this.dataSource = new MatTableDataSource<Usuario>(usuarios);
		});
		// setTimeout(() => (this.dataSource.paginator = this.paginator));
		// setTimeout(() => (this.dataSource.sort = this.sort));
		this.loading = false;
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
