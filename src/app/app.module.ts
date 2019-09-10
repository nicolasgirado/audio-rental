// Angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { NavigationModule } from './navigation/navigation.module';
import { SharedModule } from './shared/shared.module';
// Services
import { AuthTokenInterceptorService } from './services/auth-token-interceptor.service';
// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// Locale
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR';
registerLocaleData(localeEs);
// Token Getter
export function tokenGetter() {
	return localStorage.getItem('token');
}

@NgModule({
	declarations: [ AppComponent, LoginComponent, PageNotFoundComponent ],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		JwtModule.forRoot({
			config: {
				tokenGetter
				// whitelistedDomains: ['localhost:3000', 'localhost:4200']
			}
		}),
		AppRoutingModule,
		NavigationModule,
		SharedModule
	],
	providers: [
		// Locale
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthTokenInterceptorService,
			multi: true
		},
		{ provide: LOCALE_ID, useValue: 'es-AR' }
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
