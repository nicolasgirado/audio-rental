import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

	constructor(public usuarioService: UsuarioService) {}

	ngOnInit() {
		this.usuarioService.obtenerUsuarios().subscribe((usuarios: any) => {
			this.dataSource = new MatTableDataSource<Usuario>(usuarios);
		});
		setTimeout(() => (this.dataSource.paginator = this.paginator));
		setTimeout(() => (this.dataSource.sort = this.sort));
		this.loading = false;
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
