import { Book } from './book';

export class Chapter {
    id: number;
    name: string;
    description: string;
    duration: string;
    seqNo: number;
    book: Book;
    createdBy: string;
    creationDate: Date;
    constructor(book: Book) {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.duration = '';
        this.seqNo = 0;
        this.book = book;
        this.createdBy = 'FrontEnd';
        this.creationDate = new Date();
    }
}