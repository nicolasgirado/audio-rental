import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { Page404Component } from './page404/page404.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
	declarations: [ Page404Component, SidebarComponent, HeaderComponent ],
	imports: [ CommonModule, RouterModule ],
	exports: [ Page404Component, SidebarComponent, HeaderComponent ]
})
export class SharedModule {}
