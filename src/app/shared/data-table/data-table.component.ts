import {
	Component,
	OnInit,
	ViewChild,
	Input,
	SimpleChanges,
	OnChanges,
	Output,
	EventEmitter
} from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatTable, MatPaginator } from '@angular/material';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: [ './data-table.component.scss' ]
})
export class DataTableComponent implements OnInit, OnChanges {
	@Input() pageTitle;
	@Input() modelName;
	@Input() tableData;
	@Input() columnHeader;
	@ViewChild(MatTable, { static: true })
	table: MatTable<any>;
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;
	@ViewChild(MatSort, { static: true })
	sort: MatSort;
	@Output() openDialogEvent = new EventEmitter<any>();

	objectKeys = Object.keys;
	dataSource;
	displayedColumns;

	constructor() {}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges): void {
		this.displayedColumns = this.objectKeys(this.columnHeader);
		this.displayedColumns.unshift('position');
		this.displayedColumns.push('actions');

		if (changes.tableData) {
			this.dataSource = new MatTableDataSource(this.tableData);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		}
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	openDialog(action, obj) {
		this.openDialogEvent.emit({ action, obj });
	}
}
