import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { Genre } from "../model/genre";
import { BooksService } from "./books.service";
import { catchError, finalize } from "rxjs/operators";

export class GenreDatasource implements DataSource<Genre>{
    private genresSubject = new BehaviorSubject<Genre[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private booksService: BooksService) {

    }

    loadGenres(bookId: number,
        filter: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number) {
        this.loadingSubject.next(true);
        this.booksService.findGenres(bookId, filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(genres => this.genresSubject.next(genres));
    }

    connect(collectionViewer: CollectionViewer): Observable<Genre[]> {
        console.log("Connection data source");
        return this.genresSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.genresSubject.complete();
        this.loadingSubject.complete();
    }
}

