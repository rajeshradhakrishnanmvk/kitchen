export class Chapter {
    id: number;
    name: string;
    description: string;
    duration: string;
    seqNo: number;
    bookId: number;
    createdBy: string;
    creationDate: Date;
    constructor(bookId: number) {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.duration = '';
        this.seqNo = 0;
        this.bookId = bookId;
        this.createdBy = 'FrontEnd';
        this.creationDate = new Date();
    }
}