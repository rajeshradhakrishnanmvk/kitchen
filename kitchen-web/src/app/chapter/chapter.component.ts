import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog"
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge, fromEvent } from "rxjs";
import { Book } from "../model/book";
import { BooksService } from "../services/books.service";
import { ChapterDatasource } from "../services/chapter.datasource";
import { ChapterDialogComponent } from '../chapter-dialog/chapter-dialog.component';
import { Chapter } from '../model/chapter';

@Component({
  selector: 'chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit, AfterViewInit {

  book: Book;

  dataSource: ChapterDatasource;

  displayedColumns = ["id", "name", "description", "duration", "actions"];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(private route: ActivatedRoute,
    private bookService: BooksService,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.book = this.route.snapshot.data["book"];

    this.dataSource = new ChapterDatasource(this.bookService);

    this.dataSource.loadChapters(this.book.id, '', 'asc', 0, 3);

  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadChapterPage()
        })
      )
      .subscribe();

    //reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    //on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadChapterPage())

      )
      .subscribe();
  }
  loadChapterPage() {
    this.dataSource.loadChapters(
      this.book.id,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    )
  }
  addNew() {

    const dialogRef = this.dialog.open(ChapterDialogComponent, {
      data: { chapter: new Chapter(this.book.id) }
    });
  }
  editChapter() {

  }
  deleteChapter() {

  }
}
