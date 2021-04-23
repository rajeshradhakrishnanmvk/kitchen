import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatMomentDateModule } from "@angular/material-moment-adapter";


import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ChapterComponent } from './chapter/chapter.component';
import { BookCardListComponent } from './book-card-list/book-card-list.component';
import { BookDialogComponent } from './book-dialog/book-dialog.component'
import { BooksService } from './services/books.service';
import { BooksResolver } from './services/books.resolver';
import { CreateBookOpenerComponent } from './create-book-opener/create-book-opener.component';
import { ChapterDialogComponent } from './chapter-dialog/chapter-dialog.component';
import { ChapterService } from './services/chapter.service';
import { AppService } from './services/app.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AppMaterialModule } from './app-material.module';
import { APP_BASE_HREF } from '@angular/common';

export function initApp(appService: AppService) {
  return () => appService.initApp();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ChapterComponent,
    BookCardListComponent,
    BookDialogComponent,
    CreateBookOpenerComponent,
    ChapterDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatMomentDateModule

  ],
  providers: [
    BooksService,
    BooksResolver,
    ChapterService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: initApp, deps: [AppService], multi: true },
    { provide: APP_BASE_HREF, useValue: '/book/' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [BookDialogComponent]
})
export class AppModule { }