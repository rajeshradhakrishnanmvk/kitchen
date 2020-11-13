import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from "@angular/material/menu"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatTabsModule } from "@angular/material/tabs"
import { MatInputModule } from "@angular/material/input"
import { MatListModule } from "@angular/material/list"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSortModule } from "@angular/material/sort"
import { MatTableModule } from "@angular/material/table"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatSelectModule } from "@angular/material/select";
import { HttpClientModule } from "@angular/common/http"
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
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatDatepickerModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatMomentDateModule

  ],
  providers: [
    BooksService,
    BooksResolver,
    ChapterService
  ],
  bootstrap: [AppComponent],
  entryComponents: [BookDialogComponent]
})
export class AppModule { }
