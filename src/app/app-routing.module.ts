import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './shared/page404/page404.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'page404', component: Page404Component },
	{
		path: '',
		component: PagesComponent,
		loadChildren: () => import('./pages/pages.module').then((mod) => mod.PagesModule)
	},
	{ path: '**', component: Page404Component }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
