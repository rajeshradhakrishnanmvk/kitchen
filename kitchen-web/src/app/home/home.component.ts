import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators"
import { Router } from '@angular/router';
import { BooksService } from "../services/books.service";
import { Book } from '../model/book';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  poetryChapters$: Observable<Book[]>;

  novelChapters$: Observable<Book[]>;

  constructor(
    private router: Router
    , private booksService: BooksService) { }

  ngOnInit() {

    const books$ = this.booksService.findAllBooks();

    //books$.subscribe(x => console.log(x));

    this.poetryChapters$ = books$.pipe(
      map(books => books.filter(book => book.category === 'Poetry'))
    );
    //this.poetryChapters$.subscribe(x => console.log(x));

    this.novelChapters$ = books$.pipe(
      map(books => books.filter(book => book.category === 'Novel'))
    );
    //this.novelChapters$.subscribe(x => console.log(x));
  }
  addBook(bookId: Number) {
    this.router.navigate(['book',
      {
        outlets: {
          bookEditOutlet: ['book', bookId]
        }
      }]);
  }
}
