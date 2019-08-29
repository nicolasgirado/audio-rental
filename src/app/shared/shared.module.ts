// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { MaterialModule } from './material.module';

@NgModule({
	declarations: [],
	imports: [ CommonModule, MaterialModule ],
	exports: [ MaterialModule ]
})
export class SharedModule {}
