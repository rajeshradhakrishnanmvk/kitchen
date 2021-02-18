import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Chapter } from "../model/chapter";
import { Book } from "../model/book";

@Injectable()
export class BooksService {
  private bookServiceUrl = environment.bookService;
  private chapterServiceUrl = environment.chapterService;

  constructor(private http: HttpClient) { }

  findBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(this.bookServiceUrl + `/api/Book/${bookId}`);
  }

  findAllBooks(): Observable<Book[]> {
    return this.http.get(this.bookServiceUrl + '/api/Book')
      .pipe(
        map(res => res['payload'])
      );
  }

  findAllBookChapters(bookId: number): Observable<Chapter[]> {
    return this.http.get(this.chapterServiceUrl + '/api/Chapter/GetChapter', {
      params: new HttpParams()
        .set('bookId', bookId.toString())
        .set('pageNumber', "0")
        .set('pageSize', "10")
    }).pipe(
      map(res => res["payload"])
    )
  }
  findChapters(
    bookId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3): Observable<Chapter[]> {
    return this.http.get(this.chapterServiceUrl + '/api/Chapter/GetChapter', {
      params: new HttpParams()
        .set('bookId', bookId.toString())
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(
      map(res => res["payload"])
    )
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.bookServiceUrl + '/api/Book', book)
      .pipe(tap(addBook => {
        console.log('Added Book', addBook);
      }), catchError(this.handleError<Book>(`Unable to add Book`)));
  }
  editBook(book: Book): Observable<Book> {
    return this.http.put<Book>(this.bookServiceUrl + '/api/Book/' + `${book.id}`, book)
      .pipe(tap(editedBook => {
        console.log('Added Book', editedBook);
      }), catchError(this.handleError<Book>(`Unable to edit Book`)));
  }

  deleteBook(bookId: number) {
    return this.http.delete<Boolean>(this.bookServiceUrl + '/api/Book/' + bookId)
      .toPromise()
      .then(res => res)
      .catch(this.handleError<Boolean>(`Unable to delete Book`));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return Observable.throw(error);
    };
  }
  private log(message: string) {
    console.log(`Book Service: ${message}`);
  }
}
