// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { DashboardRoutingModule } from './dashboard-routing.module';
// Components
import { DashboardComponent } from './dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
// Modules
import { PagesModule } from './pages/pages.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [ SidenavComponent, ToolbarComponent, DashboardComponent ],
	imports: [ CommonModule, DashboardRoutingModule, PagesModule, SharedModule ]
})
export class DashboardModule {}
