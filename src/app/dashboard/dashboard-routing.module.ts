// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
	{
		path: '',
		component: PagesComponent,
		loadChildren: () => import('./pages/pages.module').then((mod) => mod.PagesModule)
	},
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class DashboardRoutingModule {}
