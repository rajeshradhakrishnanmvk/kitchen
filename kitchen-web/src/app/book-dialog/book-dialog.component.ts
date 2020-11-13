import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Book } from "../model/book";
import * as moment from "moment";
import { BooksService } from '../services/books.service';


@Component({
  selector: 'book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss']
})
export class BookDialogComponent implements OnInit {

  form: FormGroup;
  description: string;
  book: Book;
  errMessage: string;

  constructor(
    private bookService: BooksService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    if (data.id == 0) {
      data = new Book();
    }
    this.description = data.description;

    this.form = fb.group({
      id: [data.id],
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      category: [data.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      iconUrl: [data.iconUrl, Validators.required],
      bookListIcon: [data.bookListIcon, Validators.required],
      bookLongDescription: [data.bookLongDescription, Validators.required],
      chapterCount: [data.chapterCount, Validators.required],
    });
  }

  ngOnInit() {
  }


  close() {
    this.dialogRef.close();
  }

  onSave() {

    this.book = new Book();
    this.book.id = +this.form.value.id;
    this.book.name = this.form.value.name;
    this.book.description = this.form.value.description;
    this.book.iconUrl = this.form.value.iconUrl;
    this.book.bookListIcon = this.form.value.bookListIcon
    this.book.bookLongDescription = this.form.value.bookLongDescription
    this.book.category = this.form.value.category
    this.book.chapterCount = +this.form.value.chapterCount
    this.book.releasedAt = this.form.value.releasedAt.toDate();
    this.book.createdBy = "FrontEnd";
    this.book.creationDate = new Date();

    if (this.form.value.id == 0) {
      this.bookService.addBook(this.book).subscribe(addBook => {
        this.dialogRef.close(addBook);
      },
        error => {
          if (404 === error.status) {
            this.errMessage = error.message;
          } else {
            this.errMessage = error.message;
          }
        });
      this.dialogRef.close(this.book);
    }
    else {
      this.bookService.editBook(this.book).subscribe(editBook => {
        this.dialogRef.close(editBook);
      },
        error => {
          if (404 === error.status) {
            this.errMessage = error.message;
          } else {
            this.errMessage = error.message;
          }
        });
      this.dialogRef.close(this.book);
    }
  }
}
