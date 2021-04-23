import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { Chapter } from "../model/chapter";
import { BooksService } from "./books.service";
import { catchError, finalize } from "rxjs/operators";

export class ChapterDatasource implements DataSource<Chapter>{
    private chaptersSubject = new BehaviorSubject<Chapter[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private booksService: BooksService) {

    }

    loadChapters(bookId: number,
        filter: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number) {
        this.loadingSubject.next(true);
        this.booksService.findChapters(bookId, filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(chapters => this.chaptersSubject.next(chapters));
    }

    connect(collectionViewer: CollectionViewer): Observable<Chapter[]> {
        console.log("Connection data source");
        return this.chaptersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.chaptersSubject.complete();
        this.loadingSubject.complete();
    }
}
