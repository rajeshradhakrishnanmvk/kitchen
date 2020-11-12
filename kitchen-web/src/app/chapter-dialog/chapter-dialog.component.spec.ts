import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterDialogComponent } from './chapter-dialog.component';

describe('ChapterDialogComponent', () => {
  let component: ChapterDialogComponent;
  let fixture: ComponentFixture<ChapterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
