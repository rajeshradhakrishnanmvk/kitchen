import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Chapter } from '../model/chapter';
import { ChapterService } from '../services/chapter.service'

@Component({
  selector: 'chapter-dialog',
  templateUrl: './chapter-dialog.component.html',
  styleUrls: ['./chapter-dialog.component.css']
})
export class ChapterDialogComponent implements OnInit {

  errMessage: string;
  chapter: Chapter;

  constructor(public dialogRef: MatDialogRef<ChapterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public chapterService: ChapterService) {
    this.chapter = data.chapter;
  }

  formControl = new FormControl('', [
    Validators.required
  ])

  ngOnInit(): void {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  onSave() {

    if (this.chapter.id == 0) {
      this.chapterService.addChapter(this.chapter).subscribe(addChapter => {
        this.dialogRef.close(addChapter);
      },
        error => {
          if (404 === error.status) {
            this.errMessage = error.message;
          } else {
            this.errMessage = error.message;
          }
        });
      this.dialogRef.close(this.chapter);
    }
    else {
      this.chapterService.editChapter(this.chapter).subscribe(editChapter => {
        this.dialogRef.close(editChapter);
      },
        error => {
          if (404 === error.status) {
            this.errMessage = error.message;
          } else {
            this.errMessage = error.message;
          }
        });
      this.dialogRef.close(this.chapter);
    }
  }

  onClose() {
    this.dialogRef.close();
  }
  submit() {
    // emppty stuff
  }
  onDelete() {
    this.chapterService.deleteChapter(this.chapter.id);
    this.dialogRef.close(this.chapter);
  }
}
