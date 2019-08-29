import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '404', component: PagenotfoundComponent },
	{
		path: '',
		component: DashboardComponent,
		loadChildren: () => import('./dashboard/dashboard.module').then((mod) => mod.DashboardModule)
	},
	{ path: '**', component: PagenotfoundComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
