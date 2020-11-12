import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog"
import { BookDialogComponent } from "../book-dialog/book-dialog.component"

import { Book } from "../model/book";

@Component({
  selector: 'book-card-list',
  templateUrl: './book-card-list.component.html',
  styleUrls: ['./book-card-list.component.scss']
})
export class BookCardListComponent implements OnInit {

  @Input()
  books: Book[];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  editBook(book: Book) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = book;

    const dialogRef = this.dialog.open(BookDialogComponent,
      dialogConfig);

    dialogRef.afterClosed().subscribe(
      val => console.log("Dialog output:", val)
    );
  }
  deleteBook(bookId: Number) {

  }
}
