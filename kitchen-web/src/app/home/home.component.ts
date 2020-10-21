import { Component, OnInit } from '@angular/core';
import { Genre } from "../model/genre";
import { Observable } from "rxjs";
import { BooksService } from "../services/books.service";
import { map } from "rxjs/operators"
import { Book } from '../model/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  poetryGenres$: Observable<Book[]>;

  novelGenres$: Observable<Book[]>;

  constructor(private booksService: BooksService) { }

  ngOnInit() {

    const books$ = this.booksService.findAllBooks();

    //books$.subscribe(x => console.log(x));

    this.poetryGenres$ = books$.pipe(
      map(books => books.filter(book => book.category === 'Poem'))
    );
    //this.poetryGenres$.subscribe(x => console.log(x));

    this.novelGenres$ = books$.pipe(
      map(books => books.filter(book => book.category === 'Novel'))
    );
    //this.novelGenres$.subscribe(x => console.log(x));
  }

}
