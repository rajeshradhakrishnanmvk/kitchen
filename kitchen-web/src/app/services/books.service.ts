import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Genre } from "../model/genre";
import { Book } from "../model/book";

@Injectable()
export class BooksService {
  private serviceUrl = environment.bookservice;

  constructor(private http: HttpClient) { }

  findBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(this.serviceUrl + `/api/Book/${bookId}`);
  }

  findAllBooks(): Observable<Book[]> {
    return this.http.get(this.serviceUrl + '/api/Book')
      .pipe(
        map(res => res['payload'])
      );
  }

  findAllBookGenres(bookId: number): Observable<Genre[]> {
    return this.http.get(this.serviceUrl + '/api/Genre/GetGenre', {
      params: new HttpParams()
        .set('bookId', bookId.toString())
        .set('pageNumber', "0")
        .set('pageSize', "10")
    }).pipe(
      map(res => res["payload"])
    )
  }
  findGenres(
    bookId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3): Observable<Genre[]> {
    return this.http.get(this.serviceUrl + '/api/Genre/GetGenre', {
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
}
