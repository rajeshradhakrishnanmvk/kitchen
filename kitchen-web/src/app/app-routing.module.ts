import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ChapterComponent } from './chapter/chapter.component';
import { CreateBookOpenerComponent } from './create-book-opener/create-book-opener.component';
import { HomeComponent } from './home/home.component';
import { BooksResolver } from './services/books.resolver';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: 'book',
    children: [
      {
        path: 'book/:bookId',
        component: CreateBookOpenerComponent, outlet: `bookEditOutlet`
      }
    ]
  },
  {
    path: "books/:id",
    component: ChapterComponent,
    resolve: {
      book: BooksResolver
    }
  },
  {
    path: "*",
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
