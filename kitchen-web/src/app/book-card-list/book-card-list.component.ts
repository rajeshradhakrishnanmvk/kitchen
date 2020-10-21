import { Component, Input, OnInit } from '@angular/core';
import { Book } from "../model/book";

@Component({
  selector: 'book-card-list',
  templateUrl: './book-card-list.component.html',
  styleUrls: ['./book-card-list.component.scss']
})
export class BookCardListComponent implements OnInit {

  @Input()
  books: Book[];

  constructor() { }

  ngOnInit() {
  }

}
