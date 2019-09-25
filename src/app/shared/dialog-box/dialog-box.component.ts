import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-dialog-box',
	templateUrl: './dialog-box.component.html',
	styleUrls: [ './dialog-box.component.scss' ]
})
export class DialogBoxComponent implements OnInit {
	title: string;
	message: string;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit(): void {
		this.title = this.data.title;
		this.message = this.data.message;
	}
}
