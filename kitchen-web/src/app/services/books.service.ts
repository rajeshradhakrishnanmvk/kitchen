import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Chapter } from "../model/chapter";
import { Book } from "../model/book";

@Injectable()
export class BooksService {
  private serviceUrl = environment.backend;

  constructor(private http: HttpClient) { }

  findBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(this.serviceUrl + `/book/${bookId}`);
  }

  findAllBooks(): Observable<Book[]> {
    return this.http.get(this.serviceUrl + '/book')
      .pipe(
        map(res => res['payload'])
      );
  }

  findAllBookChapters(bookId: number): Observable<Chapter[]> {
    return this.http.get(this.serviceUrl + '/chapter/GetChapter', {
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
    return this.http.get(this.serviceUrl + '/chapter/GetChapter', {
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
    return this.http.post<Book>(this.serviceUrl + '/book', book)
      .pipe(tap(addBook => {
        console.log('Added Book', addBook);
      }), catchError(this.handleError<Book>(`Unable to add Book`)));
  }
  editBook(book: Book): Observable<Book> {
    return this.http.put<Book>(this.serviceUrl + '/book/' + `${book.id}`, book)
      .pipe(tap(editedBook => {
        console.log('Added Book', editedBook);
      }), catchError(this.handleError<Book>(`Unable to edit Book`)));
  }

  deleteBook(bookId: number) {
    return this.http.delete<Boolean>(this.serviceUrl + '/book/' + bookId)
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
