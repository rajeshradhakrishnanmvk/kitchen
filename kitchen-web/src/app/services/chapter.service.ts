import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Chapter } from "../model/chapter";


@Injectable()
export class ChapterService {
  private readonly serviceUrl = environment.bookservice;
  //dataChange: BehaviorSubject<Chapter[]> = new BehaviorSubject<Chapter[]>([]);
  //dialogData: any;

  constructor(private http: HttpClient) { }

  // get chapter(): Chapter[] {
  //   return this.dataChange.value;
  // }

  addChapter(chapter: Chapter): Observable<Chapter> {
    return this.http.post<Chapter>(this.serviceUrl + '/api/Chapter', chapter)
      .pipe(tap(addChapter => {
        console.log('Added Chapter', addChapter);
      }), catchError(this.handleError<Chapter>(`Unable to add Chapter`)));
  }
  editChapter(chapter: Chapter): Observable<Chapter> {
    return this.http.put<Chapter>(this.serviceUrl + '/api/Chapter/' + `${chapter.id}`, chapter)
      .pipe(tap(editedChapter => {
        console.log('Added Chapter', editedChapter);
      }), catchError(this.handleError<Chapter>(`Unable to edit Chapter`)));
  }

  deleteChapter(chapterId) {
    return this.http.delete<Boolean>(this.serviceUrl + '/' + chapterId)
      .toPromise()
      .then(res => res)
      .catch(this.handleError<Boolean>(`Unable to delete Chapter`));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return Observable.throw(error);
    };
  }
  private log(message: string) {
    console.log(`Chapter Service: ${message}`);
  }
}
