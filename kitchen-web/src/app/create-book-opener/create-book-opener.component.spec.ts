import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookOpenerComponent } from './create-book-opener.component';

describe('CreateBookOpenerComponent', () => {
  let component: CreateBookOpenerComponent;
  let fixture: ComponentFixture<CreateBookOpenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBookOpenerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBookOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
