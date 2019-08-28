import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Modules
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { ServiceModule } from './services/service.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

// Services
import { InterceptorService } from './services/interceptors/interceptor.service';

@NgModule({
	declarations: [ AppComponent, LoginComponent ],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		SharedModule,
		PagesModule,
		ServiceModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptorService,
			multi: true
		}
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
