import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store'

import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';
import { RecipeRoutingModule } from './recipe-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInteceptorService } from './auth/auth.interceptor.service';
import * as fromApp from './store/app.reducer'




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RecipeRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    SharedModule,
    CoreModule,

  ],
  providers: [
    LoggingService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInteceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }