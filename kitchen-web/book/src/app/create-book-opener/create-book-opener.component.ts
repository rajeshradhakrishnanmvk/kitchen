import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';

@Component({
  selector: 'create-book-opener',
  templateUrl: './create-book-opener.component.html',
  styleUrls: ['./create-book-opener.component.scss']
})
export class CreateBookOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private activateRoute
    : ActivatedRoute,
    private location: Location) {
    const bookId = +this.activateRoute.snapshot.paramMap.get('bookId');
    this.dialog
      .open(BookDialogComponent, {
        data: {
          id: bookId
        }
      }).afterClosed()
      .subscribe(result => {
        this.location.back();
      });
  }


  ngOnInit(): void {
  }

}