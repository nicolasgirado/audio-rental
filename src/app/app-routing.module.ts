import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'page-not-found', component: PageNotFoundComponent },
	{
		path: '',
		component: NavigationComponent,
		loadChildren: () => import('./navigation/navigation.module').then((mod) => mod.NavigationModule)
	},
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
